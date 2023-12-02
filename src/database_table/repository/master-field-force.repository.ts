import {EntityRepository, Repository} from "typeorm";
import {MasterFieldForce} from "../entities/master-field-force.entity";

@EntityRepository(MasterFieldForce)
export class MasterFieldForceRepository extends Repository<MasterFieldForce> {

}