import { EntityRepository, Repository } from 'typeorm';
import { MasterMenuAccessEntity } from '../entities/master-menu-access.entity';

@EntityRepository(MasterMenuAccessEntity)
export class MasterMenuAccessRepository extends Repository<MasterMenuAccessEntity> {}
