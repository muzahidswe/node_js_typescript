import { Module } from '@nestjs/common';
import { RoutesService } from './routes.service';
import { RoutesController } from './routes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MasterRoutesRepository } from 'src/database_table/repository/master-routes.repository';
import { MasterSectionConfigurationRepository } from 'src/database_table/repository/master-section-configuration.repository';
import { MasterSectionsRepository } from 'src/database_table/repository/master-sections.repository';
import { MasterDepRepository } from 'src/database_table/repository/master-dep.repository';
import { CrudService } from 'src/utils/crud.service';
import { AppService } from 'src/app.service';
import { MasterDepLocationMappingRepository } from 'src/database_table/repository/master-dep-location-mapping.repository';
@Module({
  imports: [
    TypeOrmModule.forFeature([MasterRoutesRepository]),
    TypeOrmModule.forFeature([MasterSectionConfigurationRepository]),
    TypeOrmModule.forFeature([MasterSectionsRepository]),
    TypeOrmModule.forFeature([MasterDepRepository]),
    TypeOrmModule.forFeature([MasterDepLocationMappingRepository])
  ],
  controllers: [RoutesController],
  providers: [RoutesService, CrudService, AppService]
})
export class RoutesModule { }
