import {EntityRepository, Repository} from "typeorm";
import {MasterDep} from "../entities/master-dep.entity";

@EntityRepository(MasterDep)
export class MasterDepRepository extends Repository<MasterDep> {

}