import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';

@Injectable()
export class JwtAccessStrategy extends PassportStrategy(Strategy, 'jwt-access') {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'yourSecretKey', // Replace with a strong secret key from environment variables
        });
    }

    async validate(payload: any) {
        return { userId: payload.sub, username: payload.username, permissions: payload.permissions };
    }
}