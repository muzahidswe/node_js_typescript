import { EntityRepository, Repository } from 'typeorm';
import { MasterPasswordHisotry } from '../entities/master-user-password-history.entity';

@EntityRepository(MasterPasswordHisotry)
export class MasterPasswordHisotryRepository extends Repository<MasterPasswordHisotry> {}