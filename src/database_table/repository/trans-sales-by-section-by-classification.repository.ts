import { EntityRepository, Repository } from 'typeorm';
import { TransSalesBySectionClassification } from '../entities/trans-sales-by-section-by-classification.entity';

@EntityRepository(TransSalesBySectionClassification)
export class TransSalesBySectionClassificationRepository extends Repository<TransSalesBySectionClassification> {}
