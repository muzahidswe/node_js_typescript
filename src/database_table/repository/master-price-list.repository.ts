import { EntityRepository, Repository } from "typeorm";
import { MasterPriceList } from "../entities/master-price-list.entity";

@EntityRepository(MasterPriceList)
export class MasterPriceListRepository extends Repository<MasterPriceList> {

}