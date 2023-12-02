import {
    Inject,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Knex } from 'knex';
import { KNEX_CONNECTION } from 'nestjs-knexjs';

@Injectable()
export class AuthService {
    constructor(
        @Inject(KNEX_CONNECTION) private readonly knex: Knex,
        private jwtService: JwtService,
    ) { }

    async generateNewAccessTokenCheckingRefreshToken(request: any) {
        let refreshToken = request.headers.refreshtoken;
        let user = request.user;
        //Here the user object added inside the request from jwt.refreshtoken.strategy.ts file & validate function.
        //Guard is execute before the function 
        let payload: object;
        payload = {
            name: user.name, id: user.id, companyId:user.companyId, userTypeId: user.userTypeId,
            userRoleId: user.user_role_id, phone: user.phone, email: user.email
        };
        return {
            message: 'success',
            data: {
                accessToken: this.jwtService.sign(payload),
                refreshToken: refreshToken,
                data: {}
            },
        };
    }

    verifyJwt(jwt: string) {
        try {
            return this.jwtService.verify(jwt);
        } catch (error) {
            throw new UnauthorizedException('JWT verification failed');
        }
    }

    async checkRefreshToken(userId: string, refreshToken: string): Promise<any> {
        const res = await this.knex('token_log')
            .count('id', { as: 'total' })
            .where({ user_id: userId })
            .where({ refreshtoken: refreshToken })
            .first();

        if (res.total > 0) {
            return true;
        } else {
            return false;
        }
    }

    async validateRefreshToken(userId: string, refreshToken: string) {

        const res = await this.knex('token_log')
            .select('refreshtoken', 'refreshtokenexpires')
            .where({ user_id: userId })
            .where({ refreshtoken: refreshToken })
            .first();
        if (res) {
            return res;
        } else {
            return false;
        }
    }

}
