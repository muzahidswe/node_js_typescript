import { Module } from '@nestjs/common';
import { ProductTreeService } from './product-tree.service';
import { ProductTreeController } from './product-tree.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MasterCategoryRepository } from 'src/database_table/repository/master-category.repository';
import { MasterProductClassificationsRepository } from 'src/database_table/repository/master-product-classifications.repository';
import { MasterSkuRepository } from 'src/database_table/repository/master-sku.repository';
import { CrudService } from 'src/utils/crud.service';
import { MasterPriceListRepository } from 'src/database_table/repository/master-price-list.repository';
import { PriceGroupNameRepository } from 'src/database_table/repository/price-group-name.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([MasterCategoryRepository]),
    TypeOrmModule.forFeature([MasterProductClassificationsRepository]),
    TypeOrmModule.forFeature([MasterSkuRepository]),
    TypeOrmModule.forFeature([MasterPriceListRepository]),
    TypeOrmModule.forFeature([PriceGroupNameRepository]),
  ],
  controllers: [ProductTreeController],
  providers: [ProductTreeService, CrudService]
})
export class ProductTreeModule { }
