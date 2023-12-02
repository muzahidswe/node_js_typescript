import { EntityRepository, Repository } from 'typeorm';
import { TransSalesBySection } from '../entities/trans-sales-by-section.entity';

@EntityRepository(TransSalesBySection)
export class TransSalesBySectionRepository extends Repository<TransSalesBySection> {}
