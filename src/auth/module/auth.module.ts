import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/user/module/user.module';
import { LocalStrategy } from '../strategies/local/local.strategy';
import { AuthService } from '../services/auth.service';
import { UserService } from 'src/user/service/user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/user/entity/user.entity';
import { AuthController } from '../controller/auth.controller';
import config from 'src/config';
import { ConfigType } from '@nestjs/config';
import { JwtStrategy } from '../strategies/jwt/strategy.jwt';
import { RoleService } from 'src/role/service/role.service';
import { Role, RoleSchema } from 'src/role/entity/role.entity';
import { RoleModule } from 'src/role/module/role.module';

@Module({
    imports: [
        UserModule,
        PassportModule,
        JwtModule.registerAsync({
            inject: [config.KEY],
            useFactory: (configService: ConfigType<typeof config>) => {
                return {
                    secret: configService.jwtSecret,
                    signOptions: {
                        expiresIn: '1d'
                    }
                }
            }
        }),
        MongooseModule.forFeature([
            {
                name: Role.name,
                schema: RoleSchema
            },
            {
                name: User.name,
                schema: UserSchema
            }
        ])
    ],
    controllers: [AuthController],
    providers: [AuthService, LocalStrategy, JwtStrategy, UserService, RoleService],
})
export class AuthModule { }
