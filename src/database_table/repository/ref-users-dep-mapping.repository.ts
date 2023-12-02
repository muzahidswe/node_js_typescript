import {EntityRepository, Repository} from "typeorm";
import {RefUsersDepMapping} from "../entities/ref-users-dep-mapping.entity";

@EntityRepository(RefUsersDepMapping)
export class RefUsersDepMappingRepository extends Repository<RefUsersDepMapping> {

}