import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'yourSecretKey', // Replace with a strong secret key from environment variables
            passReqToCallback: true,
        });
    }

    async validate(req, payload: any) {
        const refreshToken = req.get('authorization').replace('Bearer', '').trim();
        return { userId: payload.sub, username: payload.username, permissions: payload.permissions, refreshToken };
    }
}