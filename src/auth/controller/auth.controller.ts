import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from "@nestjs/passport"
import { STRATEGY_LOCAL } from '../strategies/local/local.strategy';

@Controller('auth')
export class AuthController {

    @UseGuards(AuthGuard('local'))
    @Post('login')
    login(@Req() req: Request) {
        return req.user;
    }

}
