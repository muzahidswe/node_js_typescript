import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FieldForceService } from './field-force.service';
import { FieldForceController } from './field-force.controller';
import { CrudService } from 'src/utils/crud.service';
import { MasterFieldForceRouteMappingRepository } from 'src/database_table/repository/master-ff-route-mapping.repository';
import { MasterFieldForceRepository } from 'src/database_table/repository/master-field-force.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      MasterFieldForceRouteMappingRepository,
      MasterFieldForceRepository ])
  ],
  controllers: [FieldForceController],
  providers: [FieldForceService, CrudService]
})
export class FieldForceModule {}
