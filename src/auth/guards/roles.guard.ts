// roles.guard.ts

import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { access } from 'fs';

@Injectable()
export class RolesGuard implements CanActivate
{
  constructor(private reflector: Reflector) { }

  canActivate(context: ExecutionContext): boolean
  {
    const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!requiredRoles)
    {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;
 console.log("user",user);
 
    // Assuming `user.roles` is an array of strings representing the user's roles
    const hasPermission = requiredRoles.some(role => user.roles?.includes(role));

    return hasPermission;
  }
}