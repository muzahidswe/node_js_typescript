import { EntityRepository, Repository } from 'typeorm';
import { MasterMenuEntity } from '../entities/master-menu.entity';

@EntityRepository(MasterMenuEntity)
export class MasterMenuRepository extends Repository<MasterMenuEntity> {}
