import { Injectable } from '@nestjs/common';
import { LoginDTO } from 'src/user/dto/user.dto';
import { UserService } from '../../user/service/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt'
import { User } from 'src/user/entity/user.entity';
import { PayloadToken } from '../model/token.model';

@Injectable()
export class AuthService {

    constructor(
        private userService: UserService,
        private jwtService: JwtService,
    ) { }

    async validateUser(username: string, pass: string) {
        const user = await this.userService.findUserByUsername(username);
        const isMatch = await bcrypt.compare(pass, user.password);
        if (!isMatch) {
            return null;
        }
        const { password, ...response } = user.toJSON();
        return response;
    }

    generateJwt(user: User) {
        const payload: PayloadToken = { role: user.role, sub: user._id };
        return {
            access_token: this.jwtService.sign(payload),
        }
    }

}
