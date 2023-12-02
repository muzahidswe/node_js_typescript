import {EntityRepository, Repository} from "typeorm";
import {MasterDepLocationMapping} from "../entities/master-dep-location-mapping.entity";

@EntityRepository(MasterDepLocationMapping)
export class MasterDepLocationMappingRepository extends Repository<MasterDepLocationMapping> {

}