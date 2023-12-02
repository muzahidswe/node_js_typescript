import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { CrudService } from 'src/utils/crud.service';
import { ApplicationSettingsRepository } from 'src/database_table/repository/application-settings.repository';
import { MasterPasswordHisotryRepository } from 'src/database_table/repository/master-user-password-history.repository';
import { MasterUsersRepository } from 'src/database_table/repository/master-users.repository';
import { MasterPasswordPolicyRepository } from 'src/database_table/repository/master-password-policy.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ApplicationSettingsRepository,
      MasterPasswordHisotryRepository,
      MasterPasswordPolicyRepository,
      MasterUsersRepository])
  ],
  controllers: [UsersController],
  providers: [UsersService, CrudService]
})
export class UsersModule {}
