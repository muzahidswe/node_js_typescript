import { Injectable, CanActivate, ExecutionContext, Inject } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Knex } from 'knex';
import { KNEX_CONNECTION } from 'nestjs-knexjs';
import { CrudService } from 'src/utils/crud.service';
import { GlobalService } from 'src/utils/global.service';

@Injectable()
export class AccessGuard implements CanActivate {

    constructor(private reflector: Reflector,
        private readonly crudService: CrudService,
        @Inject(KNEX_CONNECTION) private readonly knex: Knex) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {

        const request = context.switchToHttp().getRequest();
        const controllerFunction = context.getClass().name + '_' + context.getHandler().name;

        if (process.env.ENVIRONMENT == 'dev') {

            const dupCheck = await this.knex('master_feature_urls')
                .select('id')
                .where('controller_function', controllerFunction)
                .first();
            if (!dupCheck) {
                let contrFunIns = {
                    url_path: request.route.path,
                    http_method: request.method,
                    controller_function: controllerFunction
                }
                await this.crudService.insertData('master_feature_urls', contrFunIns);
            }
        }

        if (GlobalService.userTypeId != 1) {

            const checkAccess = await this.knex('user_role_feature as urf')
                .select('urf.id')
                .leftJoin('system_feature', 'system_feature.id', 'urf.system_feature_id')
                .where('system_feature.controller_function', controllerFunction)
                .where('urf.user_role_id', GlobalService.userRoleId)
                .where('urf.is_active', 1)
                .where('system_feature.is_active', 1)
                .limit(1);

            if (checkAccess.length == 0) {
                return false
            } else {
                return true;
            }
        } else {

            return true;
        }

    }
}
