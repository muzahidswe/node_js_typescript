import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MasterCategoryRepository } from 'src/database_table/repository/master-category.repository';
import { CreateOutletDto, GetClassificationDto, GetListDto } from './dto/outlet.dto';
import { UpdateOutletDto } from './dto/update-outlet.dto';
import { forEach, groupBy, uniqBy } from 'lodash';

@Injectable()
export class OutletsService {
  constructor(
    @InjectRepository(MasterCategoryRepository)
    private readonly masterCategoryRepository: MasterCategoryRepository
  ) {
  }

  create(createOutletDto: CreateOutletDto) {
    return 'This action adds a new outlet';
  }

  async getOutletClassification(getClassificationDto: GetClassificationDto) {
    try {
      const sbu_id = getClassificationDto.sbu_id;

      const resultArr = await this.masterCategoryRepository.query(`
        SELECT
          mc_lv2.id lvl2_id,
          mc_lv2.slug lvl2_slug,
          mc_lv3.id lvl3_id,
          mc_lv3.slug lvl3_slug
        FROM
          master_category mc_lv1 
          LEFT JOIN master_category mc_lv2 ON mc_lv1.id = mc_lv2.type 
          LEFT JOIN master_category mc_lv3 ON mc_lv2.id = mc_lv3.parent 
          LEFT JOIN master_category mc_lv3_type ON mc_lv3_type.id = mc_lv3.type 
        WHERE
          mc_lv1.type = 6
          AND mc_lv1.status = 1 
          AND JSON_CONTAINS(mc_lv1.sbu_id,CAST( ${sbu_id} AS JSON ))
          AND mc_lv1.parent = 0
          AND mc_lv3.id <> 0
        ORDER BY mc_lv1.sort, mc_lv2.sort, mc_lv3.sort
      `);

      const dataArr = [];
      if (resultArr.length > 0) {
        resultArr.forEach(element => {
          let temp_lvl2 = {
            'key': element.lvl2_id,
            'value': element.lvl2_id,
            "title": element.lvl2_slug,
            "parent_id": 0
          };
          dataArr.push(temp_lvl2);

          if (element.lvl3_id != null) {
            let temp_lvl4 = {
              'key': element.lvl3_id,
              'value': element.lvl3_id,
              "title": element.lvl3_slug,
              "parent_id": element.lvl2_id
            };
            dataArr.push(temp_lvl4);
          }
        });
      }

      const uniqArr = uniqBy(dataArr, 'key');
      const buildTree = await this.buildTree(uniqArr);
      return {
        "message": "Data fetch successfully!",
        "success": true,
        "data": buildTree
      };
    } catch (error) {
      return {
        "message": error.message,
        "success": false,
        "data": ''
      }
    }
  }

  async buildTree(dataArr, parentId = 0) {
    const branch = [];
    for (let i = 0; i < dataArr.length; i++) {
      if (dataArr[i].parent_id == parentId) {
        const children = await this.buildTree(dataArr, dataArr[i].key);
        if (children) {
          dataArr[i].children = children;
        }
        branch.push(dataArr[i]);
      }
    }
    return branch;
  };

  async getOutletList(getListDto: GetListDto) {
    try {
      const sbu_id = getListDto.sbu_id;
      const dep_id = getListDto.dep_id;

      const outlet_basic = await this.masterCategoryRepository.query(`
          SELECT
            master_outlets.id,
            master_dep.name point_name,
            master_outlets.name,
            master_outlets.owner_name,
            master_outlets.contact_number,
            CONCAT( master_routes.slug, msc.slug ) section,
            master_outlets.outlet_code,
            master_cluster_type.slug cluster_type,
            master_clusters.slug cluster_name
          FROM
            master_outlets
            INNER JOIN master_outlet_section_mapping ON master_outlet_section_mapping.outlet_id = master_outlets.id
            INNER JOIN master_sections ON master_sections.id = master_outlet_section_mapping.section_id
            INNER JOIN master_routes ON master_routes.id = master_sections.route_id
            INNER JOIN master_section_configuration msc ON msc.id = master_sections.section_config_id
            INNER JOIN master_cluster_type ON master_cluster_type.id = master_outlets.cluster_type
            INNER JOIN master_clusters ON master_clusters.id = master_outlets.cluster_id
            INNER JOIN master_dep ON master_clusters.dep_id = master_dep.id
          WHERE
            master_outlet_section_mapping.dep_id IN(${dep_id})
            AND JSON_CONTAINS(master_outlet_section_mapping.sbu_id,CAST( ${sbu_id} AS JSON ))
            AND JSON_CONTAINS(master_clusters.sbu_id,CAST( ${sbu_id} AS JSON ))
            AND master_clusters.dep_id IN(${dep_id})
            AND master_outlets.status = 1
      `);

      const outletWiseCategory = await this.masterCategoryRepository.query(`
          SELECT
            master_outlet_classifications.outlet_id,
            master_type.slug type,
            master_category.slug
          FROM
            master_outlet_classifications
            INNER JOIN master_outlet_section_mapping ON master_outlet_section_mapping.outlet_id = master_outlet_classifications.outlet_id
            INNER JOIN master_category ON master_category.id = master_outlet_classifications.category_id
            INNER JOIN master_category master_type ON master_type.id = master_category.type
          WHERE
            master_outlet_section_mapping.dep_id IN(${dep_id})
            AND JSON_CONTAINS(master_outlet_section_mapping.sbu_id,CAST( ${sbu_id} AS JSON ))
            AND JSON_CONTAINS(master_category.sbu_id,CAST( ${sbu_id} AS JSON ))
            AND master_outlet_classifications.status = 1
            AND master_category.status = 1
      `);

      let uniqClassificationType = uniqBy(outletWiseCategory,'type');
      const header = outlet_basic[0];
      const cluster_type = [];
      const classification_type = {};
      let allClassification = [];
      const outletList = outlet_basic.map(obj =>{
        let tempClusterType = {
          text:obj.cluster_type,
          value:obj.cluster_type
        }
        cluster_type.push(tempClusterType);
        let classInfo = outletWiseCategory.filter(classification => obj.id === classification.outlet_id);
         
        const modified = uniqClassificationType.map(dt => {
          let data = {};
          let temp = classInfo.filter(info => info.type == dt['type'])[0];          
          if(temp){
            data[temp.type] = temp.slug;
            let tempObj = {
              text:temp.type,
              value:temp.slug
            }
            allClassification.push(tempObj);
          }else{
            data[dt['type']] = '';
          }
          return data;
        });
        
        return {
          ...obj,
          classifications : modified
        }
      }); 
    
      header['cluster_type'] = uniqBy(cluster_type,'value');
      header['classifications'] = uniqBy(allClassification,'value');

      return {
        "message": "Data fetch successfully!",
        "success": true,
        "data": {
          'header' : header,
          'outletList':outletList
        }
      };

    }catch (error) {
      return {
        "message": error.message,
        "success": false,
        "data": ''
      }
    }
  }

  findAll() {
    return `This action returns all outlets`;
  }

  findOne(id: number) {
    return `This action returns a #${id} outlet`;
  }

  update(id: number, updateOutletDto: UpdateOutletDto) {
    return `This action updates a #${id} outlet`;
  }

  remove(id: number) {
    return `This action removes a #${id} outlet`;
  }
}
