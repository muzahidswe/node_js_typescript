import { Module } from '@nestjs/common';
import { LocationTreeService } from './location-tree.service';
import { LocationTreeController } from './location-tree.controller';
import { MasterCategoryRepository } from '../database_table/repository/master-category.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MasterLocationsRepository } from '../database_table/repository/master-locations.repository';
import { RefUsersDepMappingRepository } from '../database_table/repository/ref-users-dep-mapping.repository';
import { MasterDepRepository } from '../database_table/repository/master-dep.repository';
import { CrudService } from 'src/utils/crud.service';
import { MasterRoutesRepository } from 'src/database_table/repository/master-routes.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      MasterCategoryRepository,
      MasterLocationsRepository,
      RefUsersDepMappingRepository,
      MasterDepRepository,
      MasterRoutesRepository])
  ],
  controllers: [LocationTreeController],
  providers: [LocationTreeService, CrudService]
})
export class LocationTreeModule { }
