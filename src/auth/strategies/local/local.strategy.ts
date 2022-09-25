import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { LoginDTO } from 'src/user/dto/user.dto';
import { AuthService } from '../../services/auth.service';

export const STRATEGY_LOCAL = 'local';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {

    constructor(private authService: AuthService) {
        super();
    }

    async validate(username: string, password: string) {
        const user = await this.authService.validateUser(username, password);
        if (!user) {
            throw new UnauthorizedException("User or Password are incorrect. Try again.");
        }
        return user;
    }
}