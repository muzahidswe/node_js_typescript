import {EntityRepository, Repository} from "typeorm";
import {MasterProductClassifications} from "../entities/master-product-classifications.entity";

@EntityRepository(MasterProductClassifications)
export class MasterProductClassificationsRepository extends Repository<MasterProductClassifications> {

}