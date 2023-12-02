import { EntityRepository, Repository } from "typeorm";
import { PriceGroupName } from "../entities/price-group-name.entity";

@EntityRepository(PriceGroupName)
export class PriceGroupNameRepository extends Repository<PriceGroupName> {

}