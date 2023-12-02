import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { compact, groupBy, keyBy, merge } from 'lodash';
import { MasterCategoryRepository } from 'src/database_table/repository/master-category.repository';
import { MasterPriceListRepository } from 'src/database_table/repository/master-price-list.repository';
import { MasterProductClassificationsRepository } from 'src/database_table/repository/master-product-classifications.repository';
import { MasterSkuRepository } from 'src/database_table/repository/master-sku.repository';
import { PriceGroupNameRepository } from 'src/database_table/repository/price-group-name.repository';
import { CreateProductTreeDto, GetProductListDto, GetProductTreeDto } from './dto/product-tree.dto';
import { UpdateProductTreeDto } from './dto/update-product-tree.dto';

@Injectable()
export class ProductTreeService {
  constructor(
    @InjectRepository(MasterCategoryRepository)
    private readonly masterCategoryRepository: MasterCategoryRepository,
    private readonly masterProductClassificationsRepository: MasterProductClassificationsRepository,
    private readonly masterSkuRepository: MasterSkuRepository,
    private readonly masterPriceListRepository: MasterPriceListRepository,
    private readonly priceGroupNameRepository: PriceGroupNameRepository
  ) {}

  create(createProductTreeDto: CreateProductTreeDto) {
    return 'This action adds a new productTree';
  }

  async getProductTree(getProductTreeDto: GetProductTreeDto) {
    try {
      const sbu_id = getProductTreeDto.sbu_id;

      const masterCategory = await this.masterCategoryRepository.query(`
        SELECT 
          id, slug 
        FROM 
          master_category
        WHERE 
          type = 1 
          AND status = 1 
          AND JSON_CONTAINS(sbu_id,CAST( ${sbu_id} AS JSON ))
      `);

      const productList = await this.masterProductClassificationsRepository
        .query(`
        SELECT
          id, slug name, display_label short_name, parent parent_id, type
        FROM
          master_product_classifications
        WHERE
          status = 1
          AND sbu_id = ${sbu_id}
        ORDER BY
          sort ASC
      `);
      let sku_list_sql = '';
      if (
        getProductTreeDto.dep_id != undefined ||
        getProductTreeDto.outlet_id != undefined
      ) {
        var d = new Date();
        var datetime =
          d.getFullYear() +
          '-' +
          (d.getMonth() + 1) +
          '-' +
          d.getDate() +
          ' ' +
          d.getHours() +
          ':' +
          d.getMinutes() +
          ':' +
          d.getSeconds();

        sku_list_sql = `
            SELECT
              ms.id, ms.name, ms.short_name, ROUND((mpl.price/1000),3) price, ms.parent_id, ms.type 
            FROM
              master_sku ms
            LEFT JOIN master_price_list mpl ON mpl.sku_id = ms.id
            LEFT JOIN master_price_group mpg ON mpl.price_group_id = mpg.id 
            WHERE
              ms.status = 1 AND ms.sbu_id = ${sbu_id} AND mpg.price_group_name = 'Outlet Price'
              AND mpg.status = 1 AND mpl.sbu_id = ${sbu_id} 
              AND '${datetime}' BETWEEN mpl.start_datetime AND mpl.end_datetime
            ORDER BY ms.sort ASC
        `;
      } else {
        sku_list_sql = `
            SELECT
              id, name, short_name, parent_id, type
            FROM
              master_sku
            WHERE
              status = 1 AND sbu_id = ${sbu_id}
            ORDER BY sort ASC
        `;
      }
      const skuList = await this.masterSkuRepository.query(sku_list_sql);

      let finalProduct = {};
      for (let index = 0; index < masterCategory.length; index++) {
        let temp_product = productList.filter((obj) => {
          if (obj.type == masterCategory[index].id) {
            return obj;
          }
        });

        let slug = masterCategory[index].slug;
        finalProduct[slug] = temp_product;
      }

      finalProduct[masterCategory[masterCategory.length - 1].slug] = skuList;
      return finalProduct;
    } catch (error) {
      return {
        message: error.message,
        success: false
      };
    }
  }

  async getList(getProductListDto: GetProductListDto) {
    try {
      const sbu_id = getProductListDto.sbu_id;
      const type = (getProductListDto.type).toUpperCase();

      const masterCategory = await this.masterCategoryRepository.query(`
        SELECT 
          id, slug 
        FROM 
          master_category
        WHERE 
          type = 1 
          AND status = 1 
          AND JSON_CONTAINS(sbu_id,CAST( ${sbu_id} AS JSON ))
      `);

      const productList = await this.masterProductClassificationsRepository.query(`
        SELECT
          id, slug name, display_label short_name, parent parent_id, type, status
        FROM
          master_product_classifications
        WHERE
          sbu_id = ${sbu_id}
          AND status = 1
        ORDER BY
          sort ASC
      `);

      var d = new Date();
      var datetime = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate() + " "
        + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();

      let sku_list_sql = `
          SELECT
            ms.id,
            ms.name,
            ms.short_name,
            ms.parent_id,
            type.slug pack_type,
            size.slug pack_size,
            ms.status 
          FROM
            master_sku ms
            INNER JOIN master_category type ON type.id = ms.pack_type
            INNER JOIN master_category size ON size.id = ms.pack_size 
          WHERE
            ms.sbu_id = ${sbu_id}
            AND ms.status = 1
          ORDER BY
            ms.sort
      `;
      
      const skuList = await this.masterSkuRepository.query(sku_list_sql);
      const skuGroup = await this.priceGroupNameRepository.query(`SELECT id, price_group_name FROM master_price_group WHERE status = 1`);
      const groupWisePrice = await this.masterPriceListRepository.query(`
            SELECT
              mpl.sku_id,
              ROUND((mpl.price/1000),3) price,
              mpg.id group_id,
              mpg.price_group_name
            FROM
              master_price_list mpl
              INNER JOIN master_price_group mpg ON mpg.id = mpl.price_group_id
            WHERE
              mpl.sbu_id IN (${sbu_id}) 
              AND "${datetime}" BETWEEN mpl.start_datetime 
              AND mpl.end_datetime
              AND mpg.status = 1
      `);

      const finalSKUList = skuList.map(obj =>{        
        let priceInfo = groupWisePrice.filter(price => obj.id === price.sku_id);
        const modifiyPrice = skuGroup.map(dt => {
          let data = {};
          let temp = priceInfo.filter(info => info.price_group_name == dt['price_group_name'])[0];          
          if(temp){
            data[temp.price_group_name] = parseFloat(temp.price)
          }else{
            data[dt['price_group_name']] = 0;
          }
          return data;
        });
        return {
          ...obj,
          price:modifiyPrice
        }
      });
      
      const skuIdList = keyBy(finalSKUList,'id');

      let productTree = {};
      let catTree = {};
      let treeId = 0;
      for (let index = 0; index < masterCategory.length; index++) {
        catTree[index] = (masterCategory[index].slug).toUpperCase();
        if((masterCategory[index].slug).toUpperCase() == type){
          treeId = index;          
        }
        let temp_product = productList.filter(obj => {
          if (obj.type == masterCategory[index].id) {
            return obj;
          };
        });

        let slug = (masterCategory[index].slug).toUpperCase();
        productTree[slug] = keyBy(temp_product,'id');
      }     
      productTree[masterCategory[masterCategory.length - 1].slug] = skuIdList;

      let finalTree = [];
      if(type == 'SKU'){
        let skuData = productTree[catTree[treeId]];
        for (const key in skuData) {
          if (Object.prototype.hasOwnProperty.call(skuData, key)) {
            const ele = skuData[key];          
            let temp_dt = {
              'product_name' : productTree[catTree[treeId-1]][ele.parent_id].name,
              'sku' : ele.name,
              'short_name' : ele.short_name,
              'price' : ele.price,
              'pack_size' : ele.pack_size,
              'pack_type' : ele.pack_type,
              'status' : ele.status,
            } 
            finalTree.push(temp_dt);
          }
        }
      }else if(type == 'BRAND'){
        let brandData = productTree[catTree[treeId]];
        for (const key in brandData) {
          if (Object.prototype.hasOwnProperty.call(brandData, key)) {
            const ele = brandData[key];
            let family_id = productTree[catTree[treeId-1]][ele.parent_id].parent_id;            
            let segment = productTree[catTree[treeId-2]][family_id].name;            
            let temp_dt = {
              'segment' : segment,
              'family' : productTree[catTree[treeId-1]][ele.parent_id].name,
              'brand_name' : ele.name,
              'status' : ele.status,
            } 
            finalTree.push(temp_dt);
          }
        }
      }else{
        let dataTree = productTree[catTree[treeId]];
        for (const key in dataTree) {
          if (Object.prototype.hasOwnProperty.call(dataTree, key)) {
            const ele = dataTree[key];
            let temp_dt = {} 
            if(type == 'FAMILY'){
              temp_dt = {
                'segment' : productTree[catTree[treeId-1]][ele.parent_id].name,
                'name' : ele.name,
                'short_name' : ele.short_name,
                'status' : ele.status,
              }
            }else{
              temp_dt = {
                'name' : ele.name,
                'short_name' : ele.short_name,
                'status' : ele.status,
              }
            }
            finalTree.push(temp_dt);
          }
        }
      }    

      return {
        "message": "Data fetch Successfully",
        "success": true,
        "data": finalTree
      }
    } catch (error) {
      return {
        "message": error.message,
        "success": false
      }
    }
  }

  async getSkuList(getProductTreeDto: GetProductTreeDto) {
    try {
      const sbu_id = getProductTreeDto.sbu_id;
      const dep_id = getProductTreeDto.dep_id;


      var d = new Date();
      var datetime = d.getFullYear() +'-' +(d.getMonth() + 1) +'-' +d.getDate() +' ' +
          d.getHours() +':' +d.getMinutes() +':' +d.getSeconds();
      
      const skuList = await this.masterSkuRepository.query(`
        SELECT
          t2.id, t2.name, t2.short_name, ROUND((mpl.price/1000),3) price 
        FROM
          master_dep AS t1
          INNER JOIN master_sku AS t2 ON JSON_CONTAINS(t1.skus -> '$[*]',CAST( t2.id AS JSON ))
          INNER JOIN master_price_list mpl ON mpl.sku_id = t2.id
          INNER JOIN master_price_group mpg ON mpl.price_group_id = mpg.id
        WHERE
          t1.id = ${dep_id} AND t2.status = 1
          AND JSON_CONTAINS(t1.sbu_id,CAST( ${sbu_id} AS JSON )) 
          AND '${datetime}' BETWEEN mpl.start_datetime AND mpl.end_datetime
          AND mpg.price_group_name = 'Outlet Price'
        GROUP BY t2.id,price 
        ORDER BY t2.sort
      `);

      return {
        message: 'Data fetch successfully',
        success: true,
        data: skuList
      };
    } catch (error) {
      return {
        message: error.message,
        success: false
      };
    }
  }

  findAll() {
    return `This action returns all productTree`;
  }

  findOne(id: number) {
    return `This action returns a #${id} productTree`;
  }

  update(id: number, updateProductTreeDto: UpdateProductTreeDto) {
    return `This action updates a #${id} productTree`;
  }

  remove(id: number) {
    return `This action removes a #${id} productTree`;
  }
}
