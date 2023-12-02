import { EntityRepository, Repository } from 'typeorm';
import { MasterFieldForceRouteMapping } from '../entities/master-ff-route-mapping.entity';

@EntityRepository(MasterFieldForceRouteMapping)
export class MasterFieldForceRouteMappingRepository extends Repository<MasterFieldForceRouteMapping> {}
