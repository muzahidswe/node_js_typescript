import {EntityRepository, Repository} from "typeorm";
import {MasterSku} from "../entities/master-sku.entity";

@EntityRepository(MasterSku)
export class MasterSkuRepository extends Repository<MasterSku> {

}