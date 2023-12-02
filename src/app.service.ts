import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MasterDepLocationMappingRepository } from './database_table/repository/master-dep-location-mapping.repository';
@Injectable()
export class AppService {
    constructor(
        @InjectRepository(MasterDepLocationMappingRepository)
        private readonly masterDepLocationMappingRepository : MasterDepLocationMappingRepository
    ){    
    }
    async bpath(sbu_id, date, dep_id, section_id) {
        const d = date.split('-');
        const dir = `${process.env.FILE_PATH}/${sbu_id}/${d[0]}/${d[1]}/${d[2]}/${dep_id}/${section_id}`;

        let rr = [];
        rr['root'] = process.env.FILE_PATH;
        rr['sec'] = dir + '/section.json';
        rr['out'] = dir + '/outlet.json';

        return rr;
    }
    async get_dep_ids_from_distributor_id(distributor_ids){
        const distributor_ids_array = distributor_ids.split(",");
        const { dep_ids } = await this.masterDepLocationMappingRepository
        .createQueryBuilder('master_dep_location_mapping')
        .select('GROUP_CONCAT(DISTINCT dep_id) as dep_ids')
        .where('location_id IN (:...distributor_ids)',{distributor_ids:distributor_ids_array})
        .andWhere('status = :status',{status:1})
        .getRawOne();
        return dep_ids;
    }
}
