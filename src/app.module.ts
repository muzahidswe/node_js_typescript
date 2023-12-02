import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod
} from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { AppService } from './app.service';
import { NestjsKnexModule } from 'nestjs-knexjs';
import { AuthModule } from './auth/auth.module';
import { RefreshTokenMiddleware } from './middleware/refreshtoken.middleware';
import { BulkEntryModule } from './bulk-entry/bulk-entry.module';
import { LocationTreeModule } from './location-tree/location-tree.module';
import { DatabaseModule } from 'database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesModule } from './roles/roles.module';
import { ProductTreeModule } from './product-tree/product-tree.module';
import { StaticFileModule } from './static-file/static-file.module';
import { LocationListModule } from './location-list/location-list.module';
import { RoutesModule } from './routes/routes.module';
import { OutletsModule } from './outlets/outlets.module';
import { FieldForceModule } from './field-force/field-force.module';
import { MasterDepLocationMappingRepository } from './database_table/repository/master-dep-location-mapping.repository';
import { UsersModule } from './users/users.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { MenuModule } from './menu/menu.module';
import { MenuAccessModule } from './menu-access/menu-access.module';
@Module({
  imports: [
    ConfigModule.forRoot(),
    NestjsKnexModule.register({
      client: process.env.DB_CLIENT,
      connection: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
      }
    }),
    DatabaseModule,
    AuthModule,
    BulkEntryModule,
    LocationTreeModule,
    RolesModule,
    LocationTreeModule,
    ProductTreeModule,
    StaticFileModule,
    LocationListModule,
    RoutesModule,
    OutletsModule,
    FieldForceModule,
    TypeOrmModule.forFeature([MasterDepLocationMappingRepository]),
    UsersModule,
    DashboardModule,
    MenuModule,
    MenuAccessModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(RefreshTokenMiddleware)
      .exclude({ path: '/static-file(.*)', method: RequestMethod.GET })
      .forRoutes('*');
  }
}
