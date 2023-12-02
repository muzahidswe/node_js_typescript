import { EntityRepository, Repository } from "typeorm";
import { MasterSectionConfiguration } from "../entities/master-section-configuration.entity";

@EntityRepository(MasterSectionConfiguration)
export class MasterSectionConfigurationRepository extends Repository<MasterSectionConfiguration> {

}