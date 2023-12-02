import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MasterCategoryRepository } from '../database_table/repository/master-category.repository';
import { MasterLocationsRepository } from '../database_table/repository/master-locations.repository';
import { MasterDepRepository } from 'src/database_table/repository/master-dep.repository';
import { AppService } from 'src/app.service';
import * as moment from 'moment';
import {
  CreateLocationListDto,
  GetLocationListDto
} from './dto/location-list.dto';
import { UpdateLocationListDto } from './dto/update-location-list.dto';

@Injectable()
export class LocationListService {
  constructor(
    @InjectRepository(MasterLocationsRepository)
    @InjectRepository(MasterDepRepository)
    private readonly masterCategoryRepository: MasterCategoryRepository,
    private readonly masterLocationsRepository: MasterLocationsRepository,
    private readonly masterDepRepository: MasterDepRepository,
    private readonly appService: AppService
  ) {}
  create(createLocationListDto: CreateLocationListDto) {
    return 'This action adds a new locationList';
  }

  async getLocationList(getLocationListDto: GetLocationListDto) {
    try {
      const sbu_id = getLocationListDto.sbu_id;
      const location_type = getLocationListDto.location_type;

      const masterLocation = await this.masterLocationsRepository.query(`
          SELECT
            ml.id,
            ml.slug name,
            mc.slug head 
          FROM
            master_locations ml
          INNER JOIN master_category mc ON mc.id = ml.location_type 
          WHERE
            JSON_CONTAINS(ml.sbu_id,CAST( ${sbu_id} AS JSON ))
            AND ml.location_type = ${location_type} 
            AND ml.status = 1
      `);

      let locationHead = '';
      let finalLocationList = {};
      let locationList = masterLocation.map((location) => {
        locationHead = location.head;
        return {
          id: location.id,
          name: location.name
        };
      });

      finalLocationList[locationHead] = locationList;
      return finalLocationList;
    } catch (error) {
      return {
        message: error.message,
        success: false
      };
    }
  }

  async browseDistributionPoint(query){
    let { distributor_id } = query;
    let dep_ids = await this.appService.get_dep_ids_from_distributor_id(distributor_id);
    try{
        let distributionPointList = await this.masterCategoryRepository.query(`SELECT
              master_dep.id dep_id,
              master_dep.display_name dep_name,
              region.slug region,
              area.slug area,
              distributor.slug distribution_house,
              territory.slug territory,
              master_dep.address,
              master_dep.email,
              master_dep.contact_no,
              prev_sales_enable,
              prev_sales_date 
            FROM
              master_dep
              INNER JOIN master_locations AS territory ON master_dep.parent_location_id = territory.id 
              INNER JOIN master_locations AS distributor ON territory.parent_id = distributor.id
              INNER JOIN master_locations AS area ON distributor.parent_id = area.id
              INNER JOIN master_locations AS region ON area.parent_id = region.id 
            WHERE
              distributor.id IN ( ${distributor_id} )`);
          
        let enabled_skus_data = await this.masterCategoryRepository.query(`
                        SELECT
                  master_dep.id dep_id,
                  master_sku.id sku_id,
                  master_sku.short_name sku_name
                FROM
                  master_dep
                  INNER JOIN master_sku ON JSON_CONTAINS(master_dep.skus, CAST(master_sku.id as JSON), '$')
                WHERE
                  master_dep.id IN (${dep_ids})
                ORDER BY
                  master_dep.id,
                  master_sku.sort`);

          let distributorsPointData = distributionPointList.map(obj => {
            let enabledSkuList = enabled_skus_data.filter(tmp=>tmp.dep_id == obj.dep_id);

            let sales_date = obj.prev_sales_enable === 1 ? (moment(obj.prev_sales_date)).format('YYYY-MM-DD')  : (moment(Date.now())).format('YYYY-MM-DD');
            delete obj['prev_sales_date'];
            delete obj['prev_sales_enable'];

            return{
              ...obj,
              sales_date,
              enabledSkuList
            }
          })

          return {
            "message": "Data fetched successfully!",
            "success": true,
            "data": distributorsPointData
          }
    }catch(error){
      return{
        "message": error.message,
        "success": false,
        "data": ""
      }
    }   
  }

  async updateDistributionPoint(updateLocationListDto){
    try{
      //return updateLocationListDto;
     let { dep_id, email, address, skus, contact_no } = updateLocationListDto;
     
    let update = await this.masterDepRepository.query(`UPDATE master_dep 
            SET email = '${email}',
            address = '${address}',
            contact_no = '${contact_no}',
            skus = JSON_MERGE_PATCH(skus, JSON_ARRAY(${skus}))
            WHERE
              id = ${dep_id}`);

        return{
          "message": "Data updated successfully!",
          "success": true,
          "data": update
        }
    }catch(error){
      return{
        "message": error.message,
        "success": false,
        "data": ""
      }
    }  
  }

  findAll() {
    return `This action returns all locationList`;
  }

  findOne(id: number) {
    return `This action returns a #${id} locationList`;
  }

  update(id: number, updateLocationListDto: UpdateLocationListDto) {
    return `This action updates a #${id} locationList`;
  }

  remove(id: number) {
    return `This action removes a #${id} locationList`;
  }
}
