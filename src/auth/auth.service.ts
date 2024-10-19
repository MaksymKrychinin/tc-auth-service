import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from './user.entity';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private jwtService: JwtService,
    ) {}

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.userRepository.findOne({ where: { username } });
        if (user && await bcrypt.compare(pass, user.password)) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async login(user: any) {
        const payload = { username: user.username, sub: user.id, permissions: user.permissions };
        return {
            access_token: this.jwtService.sign(payload),
            refresh_token: this.jwtService.sign(payload, { expiresIn: '7d' }), // Refresh Token expires in 7 days
        };
    }

    async refresh(refreshToken: string) {
        const user = this.jwtService.verify(refreshToken, { secret: 'yourSecretKey' });
        return this.login(user);
    }

    async register(username: string, pass: string, email: string, permissions: string[]) {
        const hashedPassword = await bcrypt.hash(pass, 10);
        const newUser = this.userRepository.create({ username, password: hashedPassword, email, permissions });
        return this.userRepository.save(newUser);
    }
}