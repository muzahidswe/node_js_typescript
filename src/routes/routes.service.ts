import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AppService } from 'src/app.service';
import { MasterRoutes } from 'src/database_table/entities/master-routes.entity';
import { MasterDepRepository } from 'src/database_table/repository/master-dep.repository';
import { MasterRoutesRepository } from 'src/database_table/repository/master-routes.repository';
import { MasterSectionConfigurationRepository } from 'src/database_table/repository/master-section-configuration.repository';
import { MasterSectionsRepository } from 'src/database_table/repository/master-sections.repository';
import {
  CreateRouteDto,
  GetRouteDto,
  GetRouteWiseTargetDto
} from './dto/route-info.dto';
import { UpdateRouteDto } from './dto/update-route.dto';
import * as fs from 'fs';

@Injectable()
export class RoutesService {
  constructor(
    @InjectRepository(MasterRoutesRepository)
    private readonly masterRoutesRepository: MasterRoutesRepository,
    private readonly masterSectionConfigurationRepository: MasterSectionConfigurationRepository,
    private readonly masterSectionsRepository: MasterSectionsRepository,
    private readonly masterDepRepository: MasterDepRepository,
    private readonly appService: AppService
  ) {}
  async getRouteList(getRouteDto: GetRouteDto) {
    try {
      const sbu_id = getRouteDto.sbu_id;
      const dep_id = getRouteDto.dep_id;

      const masterDep = await this.masterRoutesRepository.query(`
        SELECT prev_sales_enable, prev_sales_date
        FROM master_dep
        WHERE JSON_CONTAINS(sbu_id,CAST( ${sbu_id} AS JSON )) AND id = ${dep_id}
      `);

      var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      let d =
        masterDep[0].prev_sales_enable == 1 &&
        masterDep[0].prev_sales_date != null
          ? new Date(masterDep[0].prev_sales_date)
          : new Date();
      let day = days[d.getDay()];

      const masterRoutes = await this.masterRoutesRepository.query(`        
        SELECT 
          master_sections.id section_id, 
          CONCAT(master_routes.slug,master_section_configuration.slug) section,
          master_field_forces.id ff_id,
          master_field_forces.fullname ff_name
        FROM master_sections
        INNER JOIN master_routes ON master_sections.route_id = master_routes.id
        INNER JOIN master_section_configuration ON master_sections.section_config_id = master_section_configuration.id
        LEFT JOIN master_ff_route_mapping ON master_ff_route_mapping.route_id = master_routes.id
	      LEFT JOIN master_field_forces ON master_ff_route_mapping.field_force_id = master_field_forces.id
        WHERE 
          JSON_EXTRACT( active_days, "$.${day}" ) 
          AND master_sections.status = 1 
          AND master_routes.status = 1 
          AND JSON_CONTAINS(master_sections.sbu_id,CAST( ${sbu_id} AS JSON ))
          AND master_sections.dep_id = ${dep_id}
      `);
      let system_month =
        d.getMonth() + 1 < 10 ? '0' + (d.getMonth() + 1) : d.getMonth() + 1;
      let system_day = d.getDate() < 10 ? '0' + d.getDate() : d.getDate();
      let system_date = d.getFullYear() + '-' + system_month + '-' + system_day;
      const finalData = [];
      masterRoutes.forEach(async (el) => {
        const file_path = await this.appService.bpath(
          sbu_id,
          system_date,
          dep_id,
          el.section_id
        );
        let del = '';
        if (fs.existsSync(file_path['sec'])) {
          del = 'exist';
        }
        let temp = {
          section_id: el.section_id,
          section: el.section,
          ff_id: el.ff_id,
          ff_name: el.ff_name,
          status: del
        };
        finalData.push(temp);
      });
      return {
        message: 'Data fetch successfully!',
        success: true,
        data: finalData
      };
    } catch (error) {
      return {
        message: error.message,
        success: false,
        data: ''
      };
    }
  }

  async getRouteWiseTargetOutlet(getRouteWiseTargetDto: GetRouteWiseTargetDto) {
    try {
      const sbu_id = getRouteWiseTargetDto.sbu_id;
      const section_id = getRouteWiseTargetDto.section_id;

      const countTargetOutlet = await this.masterRoutesRepository.query(`
        SELECT
          section_id,
          COUNT( DISTINCT outlet_id ) target_outlet 
        FROM
          master_outlet_section_mapping 
        WHERE
          section_id IN (${section_id}) 
          AND master_outlet_section_mapping.status = 1 
          AND master_outlet_section_mapping.sbu_id = ${sbu_id}
      `);
      return {
        message: 'Data fetch successfully!',
        success: true,
        data: countTargetOutlet
      };
    } catch (error) {
      return {
        message: error.message,
        success: false
      };
    }
  }

  create(createRouteDto: CreateRouteDto) {
    return 'This action adds a new route';
  }

  findAll() {
    return `This action returns all routes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} route`;
  }

  update(id: number, updateRouteDto: UpdateRouteDto) {
    return `This action updates a #${id} route`;
  }

  remove(id: number) {
    return `This action removes a #${id} route`;
  }
}
