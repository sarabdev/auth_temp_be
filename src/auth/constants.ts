import { SetMetadata } from '@nestjs/common';
require("dotenv").config();

export const jwtConstants = {
  secret: process.env.JWT_SECRET,
};

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

export const ROLES_KEY = 'roles';
export const Roles = (...roles: String[]) => SetMetadata(ROLES_KEY, roles);
