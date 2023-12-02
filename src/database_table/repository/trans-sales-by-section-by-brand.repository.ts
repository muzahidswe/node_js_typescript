import { EntityRepository, Repository } from 'typeorm';
import { TransSalesBySectionByBrand } from '../entities/trans-sales-by-section-by-brand.entity';

@EntityRepository(TransSalesBySectionByBrand)
export class TransSalesBySectionByBrandRepository extends Repository<TransSalesBySectionByBrand> {}
