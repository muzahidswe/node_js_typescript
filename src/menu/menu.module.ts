import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MenuService } from './menu.service';
import { MenuController } from './menu.controller';
import { MasterMenuRepository } from '../database_table/repository/master-menu.repository';
import { MasterMenuAccessRepository } from '../database_table/repository/master-menu-access.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([MasterMenuRepository, MasterMenuAccessRepository])
  ],
  controllers: [MenuController],
  providers: [MenuService]
})
export class MenuModule {}
