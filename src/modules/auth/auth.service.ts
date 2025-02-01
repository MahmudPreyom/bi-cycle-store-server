/* eslint-disable @typescript-eslint/no-unused-vars */
import { StatusCodes } from 'http-status-codes';
import config from '../../app/config';
import AppError from '../../app/errors/AppError';
import bcrypt from 'bcrypt';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { TUser } from '../users/user.interface';
import { User } from '../users/user.model';
import { TLoginUser } from './auth.interface';

const register = async (payload: TUser) => {
  const result = await User.create(payload);
  return result;
};

const login = async (payload: TLoginUser) => {
  const user = await User.findOne({ email: payload?.email }).select(
    '+password',
  );

  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, 'This user is not found !');
  }

  const isActiveStatus = user?.isActivate;

  if (isActiveStatus === false) {
    throw new AppError(StatusCodes.FORBIDDEN, 'This user is blocked !');
  }

  const isPasswordMatch = await bcrypt.compare(
    payload?.password,
    user?.password,
  );

  if (!isPasswordMatch) {
    throw new AppError(StatusCodes.UNAUTHORIZED, 'Password can not match!');
  }

  const accessToken = jwt.sign(
    {
      _id: user._id,
      email: user.email,
      role: user.role,
    },
    config.jwt_access_secret as string,
    { expiresIn: '15d' },
  );

  const refreshToken = jwt.sign(
    {
      _id: user._id,
      email: user.email,
      role: user.role,
    },
    config.jwt_refresh_secret as string,
    { expiresIn: '365d' },
  );

  //   eslint-disable-next-line no-unused-vars
  const { password, ...remainingData } = user;

  return { accessToken, refreshToken, remainingData };
};

const refreshToken = async (token: string) => {
  const decoded = jwt.verify(
    token,
    config.jwt_refresh_secret as string,
  ) as JwtPayload;

  const { email } = decoded;

  const user = await User.findOne({ email });

  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, 'User not found');
  }

  const isActiveStatus = user?.isActivate;

  if (isActiveStatus === false) {
    throw new AppError(StatusCodes.FORBIDDEN, 'This user is deactivated !!');
  }

  // if (requiredRole && !requiredRole.includes(role)) {
  //   throw new AppError(StatusCodes.FORBIDDEN, 'You are not authorized');
  // }

  const accessToken = jwt.sign(
    {
      _id: user._id,
      email: user.email,
      role: user.role,
    },
    config.jwt_access_secret as string,
    { expiresIn: '15d' },
  );

  return { accessToken };
};

// const logout = async () => {
//   return { message: 'User logged out successfully' };
// };

export const AuthServices = {
  register,
  login,
  refreshToken,
  // logout,
};
