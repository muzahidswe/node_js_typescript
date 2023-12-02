import { Module } from '@nestjs/common';
import { MenuAccessService } from './menu-access.service';
import { MenuAccessController } from './menu-access.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MasterMenuAccessRepository } from '../database_table/repository/master-menu-access.repository';

@Module({
  imports: [TypeOrmModule.forFeature([MasterMenuAccessRepository])],
  controllers: [MenuAccessController],
  providers: [MenuAccessService]
})
export class MenuAccessModule {}
