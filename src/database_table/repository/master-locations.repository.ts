import {EntityRepository, Repository} from "typeorm";
import {MasterLocations} from "../entities/master-locations.entity";

@EntityRepository(MasterLocations)
export class MasterLocationsRepository extends Repository<MasterLocations> {

}