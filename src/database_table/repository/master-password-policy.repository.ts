import { EntityRepository, Repository } from 'typeorm';
import { MasterPasswordPolicy } from '../entities/master-password-policy.entity';

@EntityRepository(MasterPasswordPolicy)
export class MasterPasswordPolicyRepository extends Repository<MasterPasswordPolicy> {}