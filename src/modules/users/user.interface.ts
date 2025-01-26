/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';
import { USER_ROLE } from './user.const';

export type TUser = {
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'customer';
  isActivate: boolean;
};

export interface UserModel extends Model<TUser> {
  isUserExistsById(_id: string): Promise<TUser>;
}

export type TUserRole = keyof typeof USER_ROLE;
