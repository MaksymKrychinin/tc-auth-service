import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { RefreshTokenGuard } from './guards/refresh-token.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req) {
        return this.authService.login(req.user);
    }

    @Post('register')
    async register(@Body() body) {
        const { username, password, email, permissions } = body;
        return this.authService.register(username, password, email, permissions);
    }

    @UseGuards(RefreshTokenGuard)
    @Post('refresh')
    async refresh(@Request() req) {
        const { refresh_token } = req.body;
        return this.authService.refresh(refresh_token);
    }
}