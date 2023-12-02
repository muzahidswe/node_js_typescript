import { EntityRepository, Repository } from "typeorm";
import { MasterRoutes } from "../entities/master-routes.entity";

@EntityRepository(MasterRoutes)
export class MasterRoutesRepository extends Repository<MasterRoutes> {

}