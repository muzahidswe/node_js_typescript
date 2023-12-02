import {EntityRepository, Repository} from "typeorm";
import {MasterCategory} from "../entities/master-category.entity";

@EntityRepository(MasterCategory)
export class MasterCategoryRepository extends Repository<MasterCategory> {

}