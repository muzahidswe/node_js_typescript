import { Module } from '@nestjs/common';
import { OutletsService } from './outlets.service';
import { OutletsController } from './outlets.controller';
import { MasterCategoryRepository } from 'src/database_table/repository/master-category.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CrudService } from 'src/utils/crud.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([MasterCategoryRepository])
  ],
  controllers: [OutletsController],
  providers: [OutletsService, CrudService]
})
export class OutletsModule { }
