import { Module } from '@nestjs/common';
import { LocationListService } from './location-list.service';
import { LocationListController } from './location-list.controller';
import { MasterCategoryRepository } from '../database_table/repository/master-category.repository';
import { MasterLocationsRepository } from '../database_table/repository/master-locations.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CrudService } from 'src/utils/crud.service';
import { AppService } from 'src/app.service';
import { MasterDepLocationMappingRepository } from 'src/database_table/repository/master-dep-location-mapping.repository';
import { MasterDepRepository } from 'src/database_table/repository/master-dep.repository';
@Module({
  imports: [
    TypeOrmModule.forFeature([
      MasterCategoryRepository,
      MasterLocationsRepository,
      MasterDepLocationMappingRepository,
      MasterDepRepository
    ])
  ],
  controllers: [LocationListController],
  providers: [LocationListService, CrudService, AppService]
})
export class LocationListModule { }
