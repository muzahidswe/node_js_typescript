import { Module } from '@nestjs/common';
import { StaticFileService } from './static-file.service';
import { StaticFileController } from './static-file.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MasterAppAssetsRepository } from 'src/database_table/repository/master-app-assets.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([MasterAppAssetsRepository]),
  ],
  controllers: [StaticFileController],
  providers: [StaticFileService]
})
export class StaticFileModule {}
