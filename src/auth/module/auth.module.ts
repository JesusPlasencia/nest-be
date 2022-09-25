import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { UserModule } from 'src/user/module/user.module';
import { LocalStrategy } from '../strategies/local/local.strategy';
import { AuthService } from '../services/auth.service';
import { UserService } from 'src/user/service/user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/user/entity/user.entity';
import { AuthController } from '../controller/auth.controller';

@Module({
    imports: [MongooseModule.forFeature([
        {
            name: User.name,
            schema: UserSchema
        }
    ]),
        PassportModule],
    controllers: [AuthController],
    providers: [AuthService, LocalStrategy, UserService],
})
export class AuthModule { }
