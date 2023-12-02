import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateLocationTreeDto, GetLocationTreeDto } from './dto/location-tree.dto';
import { UpdateLocationTreeDto } from './dto/update-location-tree.dto';
import { MasterCategoryRepository } from '../database_table/repository/master-category.repository';
import { MasterDepRepository } from '../database_table/repository/master-dep.repository';
import { MasterLocationsRepository } from '../database_table/repository/master-locations.repository';
import { RefUsersDepMappingRepository } from '../database_table/repository/ref-users-dep-mapping.repository';
import { MasterRoutesRepository } from '../database_table/repository/master-routes.repository'
import { MasterCategory } from 'src/database_table/entities/master-category.entity';
import { createQueryBuilder } from 'typeorm';
import { forEach, forEachRight, slice } from 'lodash';

@Injectable()
export class LocationTreeService {
  constructor(
    @InjectRepository(MasterCategoryRepository)
    @InjectRepository(MasterRoutesRepository)
    private readonly masterCategoryRepository: MasterCategoryRepository,
    private readonly masterLocationsRepository: MasterLocationsRepository,
    private readonly refUsersDepMappingRepository: RefUsersDepMappingRepository,
    private readonly masterDepRepository: MasterDepRepository,
    private readonly masterRoutesRepository: MasterRoutesRepository
  ) {
  }
  create(createLocationTreeDto: CreateLocationTreeDto) {
    return 'This action adds a new locationTree';
  }

  async getLocationTree(getLocationTreeDto: GetLocationTreeDto) {
    const sbu_id = getLocationTreeDto.sbu_id;
    const dep_id = getLocationTreeDto.dep_id;

    const masterCategory = await this.masterCategoryRepository.query(`
        SELECT 
          id, slug 
        FROM 
          master_category
        WHERE 
          type = 5 
          AND status = 1 
          AND JSON_CONTAINS(sbu_id,CAST( ${sbu_id} AS JSON ))
    `);
    const length_minus_one = masterCategory[masterCategory.length-2].id;

    const depResult = await this.masterDepRepository.query(`
      SELECT
        master_dep.id,
        master_dep.name,
        master_dep_location_mapping.location_id parent_id
      FROM
        master_dep
        INNER JOIN master_dep_location_mapping ON master_dep.id = master_dep_location_mapping.dep_id
      WHERE
        master_dep.id IN (${dep_id}) 
        AND master_dep.status = 1
        AND master_dep_location_mapping.status = 1
        AND master_dep_location_mapping.location_type = ${length_minus_one} 
    `);

    // return depResult;

    const masterLocationsResult = await this.masterCategoryRepository.query(`
      SELECT
        master_dep_location_mapping.location_id id,
        master_dep_location_mapping.location_type,	
        master_locations.slug name,
        master_locations.parent_id 
      FROM
        master_dep_location_mapping
        INNER JOIN master_category ON master_dep_location_mapping.location_type = master_category.id
        INNER JOIN master_locations ON master_dep_location_mapping.location_id = master_locations.id 
      WHERE
        master_dep_location_mapping.dep_id IN (${dep_id}) 
        AND master_dep_location_mapping.status = 1
        AND master_category.status = 1
        AND master_locations.status = 1
      ORDER BY
        master_locations.id
      `);

    let finalLocation =  {}; 
    let isH = false;
    for(let index = 0; index<masterCategory.length; index++){              
      let temp_location = masterLocationsResult.filter(obj=>{
        if(obj.location_type == masterCategory[index].id){
          return obj;
        }
      }); 

      //console.log(temp_location);

      let unique_temp_location = [];
      for(let i = 0; i<temp_location.length; i++){
        let itemArealyExist = unique_temp_location.filter(obj =>{ 
          if(obj.id == temp_location[i].id){
            return temp_location[i];
          }
        });
        if(itemArealyExist.length == 0){
          unique_temp_location.push(temp_location[i]);
        }
      }
      
      let slug = masterCategory[index].slug; 
      if(isH == false){    
        finalLocation[slug] = unique_temp_location;
        if(slug == getLocationTreeDto.lotation_to){
          isH = true;
        }
      }
    }
    if(getLocationTreeDto.lotation_to == undefined || getLocationTreeDto.lotation_to == '' || getLocationTreeDto.lotation_to == 'Distribution Point'){
      finalLocation[masterCategory[masterCategory.length-1].slug] = depResult;
    }
    return finalLocation;
  }

  async get_section_list(query){
    try{
      let { dep_ids } = query;
      let section_list = await this.masterRoutesRepository.query(`SELECT
          master_sections.id section_id,
          CONCAT(master_routes.slug,master_section_configuration.slug) section_slug
        FROM
          master_sections
        INNER JOIN master_routes ON master_sections.route_id = master_routes.id
        INNER JOIN master_section_configuration ON master_sections.section_config_id = master_section_configuration.id
        WHERE
          master_sections.dep_id IN (${dep_ids})
          AND master_sections.status = 1`);
      
        return {
          "message": "Data fetched successfully!",
          "success": true,
          "data": section_list
        };
    }catch(error){
      return {
        "message": error.message,
        "success": true,
        "data": ""
      };
    }
      
  }

  
  async get_route_list(query){
    try{
      let { dep_ids } = query;
      let route_list = await this.masterRoutesRepository.query(`
        SELECT
            master_routes.id,
            master_routes.slug,
            GROUP_CONCAT(DISTINCT CONCAT(master_routes.slug,master_section_configuration.slug)) sections,
            SUM(DISTINCT CASE WHEN master_field_forces.user_type = 42 THEN master_field_forces.id ELSE 0 END) AS 'assigned_ss',
            SUM(DISTINCT CASE WHEN master_field_forces.user_type = 41 THEN master_field_forces.id ELSE 0 END) AS 'assigned_sr',
            master_sections.strike
          FROM
            master_routes 
          INNER JOIN master_sections ON master_routes.id = master_sections.route_id
          INNER JOIN master_section_configuration ON master_sections.section_config_id = master_section_configuration.id
          LEFT JOIN master_ff_route_mapping ON master_routes.id = master_ff_route_mapping.route_id
          LEFT JOIN master_field_forces ON master_ff_route_mapping.field_force_id = master_field_forces.id
          WHERE
            master_routes.dep_id IN (${dep_ids}) 
            AND master_routes.status = 1 AND master_ff_route_mapping.status = 1
          GROUP BY 
            master_routes.id,
            master_routes.slug,
            master_sections.strike
          ORDER BY master_routes.slug`);

        return {
          "message": "Data fetched successfully!",
          "success": true,
          "data": route_list
        };
    }catch(error){
      return {
        "message": error.message,
        "success": true,
        "data": ""
      };
    }
      
  }

  async get_active_route_list(query){
    try{      
      const sbu_id = query.sbu_id;
      const dep_id = query.dep_id;

      const masterDep = await this.masterRoutesRepository.query(`
        SELECT prev_sales_enable, prev_sales_date
        FROM master_dep
        WHERE JSON_CONTAINS(sbu_id,CAST( ${sbu_id} AS JSON )) AND id = ${dep_id}
      `);
      
      var days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      let d = (masterDep[0].prev_sales_enable == 1 && masterDep[0].prev_sales_date != null) ? new Date(masterDep[0].prev_sales_date) : new Date();
      let day = days[d.getDay()];

      let route_list = await this.masterRoutesRepository.query(`
          SELECT
            master_routes.id,
            master_routes.slug,
            GROUP_CONCAT(DISTINCT CONCAT( master_routes.slug, master_section_configuration.slug )) sections,
            SUM( DISTINCT CASE WHEN master_field_forces.user_type = 42 THEN master_field_forces.id ELSE 0 END ) AS 'assigned_ss',
            SUM( DISTINCT CASE WHEN master_field_forces.user_type = 41 THEN master_field_forces.id ELSE 0 END ) AS 'assigned_sr',
            master_sections.strike 
          FROM
            master_routes
            INNER JOIN master_sections ON master_routes.id = master_sections.route_id
            INNER JOIN master_section_configuration ON master_sections.section_config_id = master_section_configuration.id
            LEFT JOIN master_ff_route_mapping ON master_routes.id = master_ff_route_mapping.route_id
            LEFT JOIN master_field_forces ON master_ff_route_mapping.field_force_id = master_field_forces.id 
          WHERE
            master_routes.dep_id IN (${dep_id}) 
            AND master_routes.status = 1 
            AND master_ff_route_mapping.status = 1 
            AND JSON_EXTRACT( active_days, "$.${day}" )
            AND master_sections.section_config_id NOT IN (498,516)
            AND JSON_CONTAINS(master_sections.sbu_id, '[${sbu_id}]' )
          GROUP BY
            master_routes.id,
            master_routes.slug,
            master_sections.strike 
          ORDER BY
            master_routes.slug`);

        return {
          "message": "Data fetched successfully!",
          "success": true,
          "data": route_list
        };
    }catch(error){
      return {
        "message": error.message,
        "success": true,
        "data": ""
      };
    }
      
  }

  async findAll() {
    // return `This action returns all locationTree`;
    return await this.masterLocationsRepository.find({
      location_type:18,
      slug:'Chittagong'
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} locationTree`;
  }

  update(id: number, updateLocationTreeDto: UpdateLocationTreeDto) {
    return `This action updates a #${id} locationTree`;
  }

  remove(id: number) {
    return `This action removes a #${id} locationTree`;
  }

  async findAllQuery(){
    return await this.masterCategoryRepository
    .createQueryBuilder("master_category")
    .getOne()
  }
}
