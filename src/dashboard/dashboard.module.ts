import { Module } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';
import { CrudService } from 'src/utils/crud.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransSalesBySectionByBrandRepository } from 'src/database_table/repository/trans-sales-by-section-by-brand.repository';
import { TransSalesBySectionClassificationRepository } from 'src/database_table/repository/trans-sales-by-section-by-classification.repository';
import { TransSectionSummaryRepository } from 'src/database_table/repository/trans-section-summary.repository';
import { MasterCategoryRepository } from 'src/database_table/repository/master-category.repository';
import { MasterProductClassificationsRepository } from 'src/database_table/repository/master-product-classifications.repository';
import { MasterSkuRepository } from 'src/database_table/repository/master-sku.repository';
import { TransSalesBySectionRepository } from 'src/database_table/repository/trans-sales-by-section.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TransSalesBySectionByBrandRepository,
      TransSalesBySectionClassificationRepository,
      TransSectionSummaryRepository,
      MasterProductClassificationsRepository,
      MasterSkuRepository,
      TransSalesBySectionRepository,
      MasterCategoryRepository
    ])
  ],
  controllers: [DashboardController],
  providers: [DashboardService, CrudService]
})
export class DashboardModule {}
