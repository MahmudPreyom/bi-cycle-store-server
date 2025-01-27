import { StatusCodes } from 'http-status-codes';
import AppError from '../../app/errors/AppError';
import { TUser } from './user.interface';
import { User } from './user.model';
import bcrypt from 'bcrypt';

const createUserIntoDB = async (payload: TUser): Promise<TUser> => {
  payload.role = 'admin';
  const result = await User.create(payload);
  return result;
};

const changePassword = async (
  userId: string,
  currentPassword: string,
  newPassword: string,
) => {
  const user = await User.findById(userId).select('+password');

  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, 'User not found!');
  }

  // Check if the current password is correct
  const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
  if (!isPasswordValid) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      'Current password is incorrect!',
    );
  }

  // Hash the new password
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(newPassword, salt);

  await user.save();

  return { message: 'Password changed successfully' };
};

const getUserFromDB = async () => {
  const result = await User.find();
  return result;
};

const updateUserActiveStatusIntoDb = async (id: string) => {
  const userId = await User.findById(id);

  if (!userId) {
    throw new AppError(StatusCodes.NOT_FOUND, 'User not found');
  }

  if (userId?.isActivate == false) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'User already deactivate');
  }

  const result = await User.findByIdAndUpdate(
    id,
    { isActivate: false },
    {
      new: true,
      runValidators: true,
    },
  );
  return result;
};

export const UserService = {
  createUserIntoDB,
  getUserFromDB,
  updateUserActiveStatusIntoDb,
  changePassword,
};
