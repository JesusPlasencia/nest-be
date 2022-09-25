import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from "@nestjs/passport"
import { STRATEGY_LOCAL } from '../strategies/local/local.strategy';
import { AuthService } from './../services/auth.service';
import { User } from './../../user/entity/user.entity'

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) { }

    @UseGuards(AuthGuard('local'))
    @Post('login')
    login(@Req() req: Request) {
        const user = req.user as User;
        return this.authService.generateJwt(user);
    }

}
