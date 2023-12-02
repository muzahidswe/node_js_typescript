import { EntityRepository, Repository } from 'typeorm';
import { TransSectionSummary } from '../entities/trans-section-summary.entity';

@EntityRepository(TransSectionSummary)
export class TransSectionSummaryRepository extends Repository<TransSectionSummary> {}
