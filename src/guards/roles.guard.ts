import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthUtils } from '../utils/auth.utils';
import { Reflector } from '@nestjs/core';
import { ROLE, ROLES_KEY } from 'src/constants';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<ROLE[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }

    const role = this.extractRoleFromRequest(
      context.switchToHttp().getRequest(),
    );
    console.log('role', role);
    return requiredRoles.some((r) => r === role);
  }

  private extractRoleFromRequest(request: Request): ROLE | undefined {
    let [type, token] = request.headers.authorization?.split(' ') ?? [];
    token = type === 'Bearer' ? token : undefined;

    if (!token) {
      throw new UnauthorizedException('Token not found');
    }

    return AuthUtils.getInstance().decodeToken(token)?.role;
  }
}
