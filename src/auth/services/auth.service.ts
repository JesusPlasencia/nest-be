import { Injectable } from '@nestjs/common';
import { LoginDTO } from 'src/user/dto/user.dto';
import { UserService } from '../../user/service/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {

    constructor(private userService: UserService) { }

    async validateUser(username: string, pass: string) {
        const user = await this.userService.findUserByUsername(username);
        const isMatch = await bcrypt.compare(pass, user.password);
        if (!isMatch) {
            return null;
        }
        const { password, ...response } = user.toJSON();
        return response;
    }

}
