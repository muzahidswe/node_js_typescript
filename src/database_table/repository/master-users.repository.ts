import { EntityRepository, Repository } from 'typeorm';
import { MasterUsers } from '../entities/master-users.entity';

@EntityRepository(MasterUsers)
export class MasterUsersRepository extends Repository<MasterUsers> {}