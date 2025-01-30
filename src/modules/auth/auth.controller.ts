import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { Request, Response } from 'express';
import { AuthServices } from './auth.service';
import config from '../../app/config';

const register = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthServices.register(req.body);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.CREATED,
    message: 'User registered successfully',
    data: { _id: result._id, name: result?.name, email: result?.email },
  });
});

const login = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthServices.login(req.body);
  const { refreshToken } = result;

  res.cookie('refreshToken', refreshToken, {
    secure: config.NODE_ENV === 'production',
    httpOnly: true,
  });

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Login successful',
    data: { token: result?.token },
  });
});

const refreshToken = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies;
  const result = await AuthServices.refreshToken(refreshToken);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Refresh token created',
    data: result,
  });
});

// const logout = catchAsync(async (req: Request, res: Response) => {
//   const result = await AuthServices.logout();

//   sendResponse(res, {
//     statusCode: StatusCodes.OK,
//     success: true,
//     message: result.message,
//   });
// });

export const AuthControllers = {
  register,
  login,
  refreshToken,
  // logout,
};
