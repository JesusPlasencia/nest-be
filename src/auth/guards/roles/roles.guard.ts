import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ROLES_KEY, Roles } from '../../decorators/roles/roles.decorator'
import { PayloadToken } from 'src/auth/model/token.model';
import { RoleService } from 'src/role/service/role.service';
import { Role } from 'src/auth/model/roles.model';

@Injectable()
export class RolesGuard implements CanActivate {

  constructor(
    private reflector: Reflector,
    private roleService: RoleService) { }

  async canActivate(context: ExecutionContext) {
    const roles = this.reflector.get<Role[]>(ROLES_KEY, context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user as PayloadToken;
    const role = await this.roleService.findById(user.role.toString());
    const isAuth = roles.some(item => item === role.name);
    if (!isAuth) {
      throw new UnauthorizedException("You have no permission to this.");
    }
    return true;
  }
}
