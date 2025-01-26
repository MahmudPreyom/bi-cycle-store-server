import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { Request, Response } from 'express';
import { AuthServices } from './auth.service';

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

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Login successful',
    data: { token: result?.token },
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
  // logout,
};
