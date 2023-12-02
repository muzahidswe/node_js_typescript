import { EntityRepository, Repository } from "typeorm";
import { MasterSections } from "../entities/master-sections.entity";

@EntityRepository(MasterSections)
export class MasterSectionsRepository extends Repository<MasterSections> {

}