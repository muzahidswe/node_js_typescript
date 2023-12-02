import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MasterFieldForceRouteMappingRepository } from 'src/database_table/repository/master-ff-route-mapping.repository';
import { MasterFieldForceRepository } from 'src/database_table/repository/master-field-force.repository';
import { GlobalService } from 'src/utils/global.service';
import {
  CreateFieldForceDto,
  EditFieldForceDto,
  EditFieldForceBasicInfoDto
} from './dto/create-field-force.dto';
import { UpdateFieldForceDto } from './dto/update-field-force.dto';
import * as bcrypt from 'bcrypt';
import { getConnection } from 'typeorm';

@Injectable()
export class FieldForceService {
  constructor(
    @InjectRepository(MasterFieldForceRouteMappingRepository)
    private readonly masterFieldForceRouteMappingRepository: MasterFieldForceRouteMappingRepository,
    @InjectRepository(MasterFieldForceRepository)
    private readonly masterFieldForceRepository: MasterFieldForceRepository
  ) {}

  async getFieldForceList(sbu_id) {
    try {
      // return dep_id;
      // AND master_routes.dep_id = '${dep_id}'
      const ff_list = await this.masterFieldForceRepository.query(
        `SELECT
        master_field_forces.id as '${`key`}',
        fullname,
        username,
        email,
        contact_no,
        nid,
        user_type,
        master_category.display_label as ff_designation
      FROM
        master_field_forces 
        INNER JOIN master_category ON master_category.id = master_field_forces.user_type        
        WHERE
          master_field_forces.status = 1 AND JSON_CONTAINS(master_field_forces.sbu_id, '[${sbu_id}]' ) `
      );
      //final_list['assigned_sr'] = sr_list;
      return {
        success: true,
        data: ff_list
      };
    } catch (error) {
      return {
        message: error.message,
        success: true,
        data: ''
      };
    }
  }

  async saveFieldForce(createFieldForceDto: CreateFieldForceDto) {
    try {
      // return createFieldForceDto;
      let contact = createFieldForceDto.contact_no;
      let user_name = createFieldForceDto.username;
      let email = createFieldForceDto.email;
      let created_by = GlobalService.userId;
      let sbu_id = createFieldForceDto.sbu_id;
      //let start_date = new Date().toISOString().slice(0, 10); //current date
      //let end_date = '2025-05-31';
      let default_password = '123';
      let ff_password = createFieldForceDto.password;
      let password = '';
      if (ff_password == 'undefined' || !ff_password) {
        password = default_password;
      } else {
        password = ff_password;
      }

      const saltOrRounds = 10;
      let final_pwd = await bcrypt.hash(password, saltOrRounds);

      const stat = 1;
      /* update query: table vul thakar karone sbu_id 1 er jaigay [1] hobe, sey jonno AND JSON_CONTAINS(sbu_id, '[${sbu_id}]' kaj kore na
      const check_if_field_force_exist =
        await this.masterFieldForceRepository.query(
          `select count(*) as total_row FROM master_field_forces 
            where contact_no = '${contact}' 
            AND username='${user_name}'
            AND email='${email}'
            AND status='${stat}'
            AND JSON_CONTAINS(sbu_id, '[${sbu_id}]' )`
        );
      */
      const check_if_field_force_exist =
        await this.masterFieldForceRepository.query(
          `select count(*) as total_row FROM master_field_forces 
            where contact_no = '${contact}' 
            AND username='${user_name}'
            AND email='${email}'
            AND status='${stat}'
            `
        );
      const total_row = check_if_field_force_exist[0].total_row;
      if (total_row > 0) {
        let msg = 'Duplicate field force has found';
        return {
          success: false,
          message: msg
        };
      } else {
        const field_force_data = {
          sbu_id: '[1]',
          dep_id: createFieldForceDto.dep_id,
          fullname: createFieldForceDto.fullname,
          email: createFieldForceDto.email,
          password: final_pwd,
          username: createFieldForceDto.username,
          contact_no: createFieldForceDto.contact_no,
          nid: createFieldForceDto.nid,
          user_type: createFieldForceDto.user_type,
          status: 1,
          created_by: created_by
        };
        
        const save_field_force = await this.masterFieldForceRepository.save(
          field_force_data
        );
        /*
        const last_inserted_id = save_field_force.id;

        let route_mapping_data = {
          sbu_id: createFieldForceDto.sbu_id,
          field_force_id: last_inserted_id,
          route_id: createFieldForceDto.route_id,
          start_date: start_date,
          end_date: end_date,
          status: 1,
          created_by: created_by
        };

        const save_mapping =
          await this.masterFieldForceRouteMappingRepository.save(
            route_mapping_data
          );
        */
        return {
          success: true,
          message: 'Field force has been added succesfully.'
        };
      }
    } catch (error) {
      return {
        message: error.message,
        success: true,
        data: ''
      };
    }
  }
  async getSrSsInfo(dep_id, sbu_id) {
    try {
      // return dep_id;
      // AND master_routes.dep_id = '${dep_id}'
      const sr_list = await this.masterFieldForceRepository.query(
        `SELECT
          master_field_forces.id AS ff_id,
          master_field_forces.username AS field_force_name,
          master_field_forces.fullname AS full_name,                   
          'SR' AS user_type 
        FROM
          master_field_forces          
        WHERE
          master_field_forces.STATUS = 1
          AND master_field_forces.dep_id = '${dep_id}'
          AND JSON_CONTAINS(sbu_id, '[${sbu_id}]' )
          AND master_field_forces.user_type = 41`
      );

      const ss_list = await this.masterFieldForceRepository.query(
        `SELECT
          master_field_forces.id AS ff_id,
          master_field_forces.username AS field_force_name,
          master_field_forces.fullname AS full_name,         
          'SS' AS user_type 
        FROM
          master_field_forces         
        WHERE
          master_field_forces.STATUS = 1 
          AND JSON_CONTAINS(sbu_id, '[${sbu_id}]' )
          AND master_field_forces.dep_id = '${dep_id}'          
          AND master_field_forces.user_type = 42`
      );
      // return ss_list;
      let final_list = {};

      final_list['assigned_ss'] = ss_list;
      final_list['assigned_sr'] = sr_list;
      return {
        success: true,
        data: final_list
      };
    } catch (error) {
      return {
        message: error.message,
        success: true,
        data: ''
      };
    }
  }
  async get_previous_day(total_days) {
    var date = new Date();
    date.setDate(date.getDate() - total_days);
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let final_month = '';
    if (month < 10) {
      final_month = '0' + month;
    } else {
      final_month = month.toString();
    }

    let day = date.getDate();
    let final_day = '';
    if (day < 10) {
      final_day = '0' + day;
    } else {
      final_day = day.toString();
    }

    let prepared_date = year + '-' + final_month + '-' + final_day;
    return prepared_date;
  }
  async updateFieldForce(editFieldForceDto: EditFieldForceDto) {
    try {
      let start_date = new Date().toISOString().slice(0, 10); //current date
      let end_date = '2025-05-31';
      //let yesterday_date = this.get_previous_day(1); // here 1 is, how many days you wanna go back.
      // return editFieldForceDto;
      let created_by = GlobalService.userId; // GlobalService has come from auth to get login userid

      let user_type = editFieldForceDto.user_type;
      let strike = editFieldForceDto.strike;
      let field_force_id = editFieldForceDto.field_force_id;
      let dep_id = editFieldForceDto.dep_id;
      let sbu_id = editFieldForceDto.sbu_id;
      let route_id = editFieldForceDto.route_id;
      // let number = editFieldForceDto.number;

      let msg = '';
      if (strike == 404 && (user_type == 'SR' || user_type == 'SS')) {
        let usr_type = 0;
        if (user_type == 'SR') {
          usr_type = 41;
        } else {
          usr_type = 42;
        }

        const field_force_route_mapping_update =
          await this.masterFieldForceRepository.query(
            `UPDATE
          master_ff_route_mapping
            SET status=0,end_date= '${start_date}'
          WHERE
            status = 1 
            AND JSON_CONTAINS(sbu_id, '[${sbu_id}]' )
            AND route_id = '${route_id}'
            AND field_force_type = '${usr_type}' `
          );
        

        //let sbu_id= JSON.stringify(source_of_data)
        if (field_force_id > 0) {
          let route_mapping_data = {
            sbu_id: JSON.stringify(sbu_id),
            field_force_id: editFieldForceDto.field_force_id,
            field_force_type: usr_type,
            route_id: editFieldForceDto.route_id,
            start_date: start_date,
            end_date: end_date,
            status: 1,
            created_by: created_by
          };
          
          const save_mapping =
            await this.masterFieldForceRouteMappingRepository.save(
              route_mapping_data
            );
        }
        msg = 'Filed force has updated succesfully';
      }

      if (strike != 404 && user_type == 'strike') {
        const strike_date_update = await this.masterFieldForceRepository.query(
          `UPDATE
          master_routes
            SET strike=${strike} 
          WHERE
            dep_id = ${dep_id}
            AND id = ${route_id} 
            AND JSON_OVERLAPS(sbu_id, '[${sbu_id}]' ) `

        );
        msg = 'Strike has updated succesfully';
      }

      return {
        success: true,
        message: msg
      };
    } catch (error) {
      return {
        message: error.message,
        success: true,
        data: ''
      };
    }
  }

  async updateFieldForceBasicInfo(
    editFieldForceBasicInfoDto: EditFieldForceBasicInfoDto
  ) {
    try {
      let id = editFieldForceBasicInfoDto.id;
      let sbu_id = editFieldForceBasicInfoDto.sbu_id;
      let user_type = editFieldForceBasicInfoDto.user_type;
      let fullname = editFieldForceBasicInfoDto.fullname;
      let username = editFieldForceBasicInfoDto.username;
      let email = editFieldForceBasicInfoDto.email;
      let contact_no = editFieldForceBasicInfoDto.contact_no;
      let nid = editFieldForceBasicInfoDto.nid;

      const ff_update = await this.masterFieldForceRepository
        .createQueryBuilder()
        .update('master_field_forces')
        .set({
          user_type: user_type,
          fullname: fullname,
          username: username,
          email: email,
          contact_no: contact_no,
          nid: nid
        })
        .where('id = :id', { id: id })
        .execute();

      let msg = ff_update
        ? 'Filed force has updated succesfully'
        : 'Filed force has not updated.';
      let response = ff_update ? true : false;

      return {
        success: response,
        message: msg
      };
    } catch (error) {
      return {
        message: error.message,
        success: true,
        data: ''
      };
    }
  }

  /*
  async getRoutes() {
    
    const sr_list = await this.masterFieldForceRepository.query(
        `SELECT
          master_field_forces.id AS ff_id,
          master_field_forces.username AS field_force_name,
          master_field_forces.fullname AS full_name,
          master_routes.slug AS number,
          'SR' AS user_type 
        FROM
          master_field_forces
          INNER JOIN master_ff_route_mapping ON master_ff_route_mapping.field_force_id = master_field_forces.id
          INNER JOIN master_routes ON master_routes.id = master_ff_route_mapping.route_id 
        WHERE
          master_field_forces.STATUS = 1 
          AND master_routes.dep_id = '${dep_id}' 
          AND master_field_forces.user_type = 41`
      );

      const ss_list = await this.masterFieldForceRepository.query(
        `SELECT
          master_field_forces.id AS ff_id,
          master_field_forces.username AS field_force_name,
          master_field_forces.fullname AS full_name,
          master_routes.slug AS number,
          'SS' AS user_type 
        FROM
          master_field_forces
          INNER JOIN master_ff_route_mapping ON master_ff_route_mapping.field_force_id = master_field_forces.id
          INNER JOIN master_routes ON master_routes.id = master_ff_route_mapping.route_id 
        WHERE
          master_field_forces.STATUS = 1 
          AND master_routes.dep_id = '${dep_id}'  
          AND master_field_forces.user_type = 42`
      );

    const routes_info =
      await this.masterFieldForceRepository.query(
        `SELECT
          master_field_forces.id AS ff_id,
          master_field_forces.username AS field_force_name,
          master_routes.id as route_id,
          master_sections.id AS section_id,	
          CONCAT( master_routes.slug, master_section_configuration.slug ) AS route,
          master_routes.status AS strike_calculation 	
        FROM
         master_field_forces 
        INNER JOIN master_ff_route_mapping ON master_ff_route_mapping.field_force_id =  master_field_forces.id
        INNER JOIN master_routes ON master_routes.id = master_ff_route_mapping.route_id
        INNER JOIN master_sections ON master_sections.route_id = master_ff_route_mapping.route_id
        INNER JOIN master_section_configuration ON master_sections.section_config_id = master_section_configuration.id 
        WHERE
         master_field_forces .status =1`
      );
      return {
        success: true,
        data: routes_info
      };
  }

  create(createFieldForceDto: CreateFieldForceDto) {
    return 'This action adds a new fieldForce';
  }

  findAll() {
    return `This action returns all fieldForce`;
  }

  findOne(id: number) {
    return `This action returns a #${id} fieldForce`;
  }

  update(id: number, updateFieldForceDto: UpdateFieldForceDto) {
    return `This action updates a #${id} fieldForce`;
  }

  remove(id: number) {
    return `This action removes a #${id} fieldForce`;
  }
  */
}
function JSON_ARRAY_APPEND(sbu_id: number) {
  throw new Error('Function not implemented.');
}

