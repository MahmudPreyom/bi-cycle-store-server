/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { StatusCodes } from 'http-status-codes';
import AppError from '../../app/errors/AppError';
import BiCycle from '../biCycle_product/biCycle-product.model';
import { User } from '../users/user.model';
import { TOrderBiCycle } from './biCycle-order.interface';
import { OrderBiCycleModel } from './biCycle.-order.model';
import mongoose from 'mongoose';
// import { orderUtils } from './order.utils';

const createOrderBiCycleService = async (
  data: TOrderBiCycle,
  userId: string,
  // client_ip: string,
) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Validate user existence
    const user = await User.findById(userId).session(session);

    if (!user) {
      throw new AppError(StatusCodes.NOT_FOUND, 'User not found');
    }

    const { product, quantity } = data;

    // Ensure email is set if required by schema
    if (!data.email) {
      data.email = user.email;
    }

    const bicycle = await BiCycle.findById(product).session(session);

    if (!bicycle || bicycle.quantity < quantity) {
      throw new AppError(
        StatusCodes.BAD_REQUEST,
        'Insufficient stock or product not found.',
      );
    }

    // Calculate total price
    data.totalPrice = bicycle.price * quantity;

    // Reduce quantity and update inStock status
    bicycle.quantity -= quantity;
    bicycle.inStock = bicycle.quantity > 0;

    await bicycle.save({ session });

    if (!bicycle) {
      throw new AppError(
        StatusCodes.BAD_REQUEST,
        'Insufficient stock or product not found.',
      );
    }

    // Create order with customer information
    const orderData = { ...data, customer: user._id };
    const result = await OrderBiCycleModel.create([orderData], { session });
    await result[0].populate('customer', 'name email role');

    await session.commitTransaction();
    session.endSession();

    // payment method
    // const shurjopayPayload = {
    //   amount: data.totalPrice,
    //   order_id: product._id,
    //   currency: 'BDT',
    //   customer_name: user.name,
    //   customer_email: user.email,
    //   customer_phone: 'N/A',
    //   customer_address: 'N/A',
    //   customer_city: 'N/A',
    //   client_ip,
    // };

    // const payment = await orderUtils.makePayment(shurjopayPayload);

    // return result[0], payment;
    return result[0];
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw new AppError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      'Something went to wrong',
    );
  }
};

const getSingleBiCycleOrderFromDB = async (id: string, userId: string) => {
  const bicycleOrderId = await OrderBiCycleModel.findById(id);

  if (!bicycleOrderId) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Order not found');
  }

  if (bicycleOrderId.customer.toString() !== userId) {
    throw new AppError(
      StatusCodes.FORBIDDEN,
      'You are not authorized to see this order',
    );
  }

  return bicycleOrderId;
};

// ================================================demo===========================
const getAllOrdersByUser = async (userId: string) => {
  const userOrders = await OrderBiCycleModel.find({
    customer: userId,
  }).populate({ path: 'product', select: 'name' });

  if (!userOrders || userOrders.length === 0) {
    throw new AppError(StatusCodes.NOT_FOUND, 'No orders found for this user');
  }

  return userOrders;
};

// const getBiCycleOrderbyuser = async (userId: string) => {
//   try {
//     const orders = await OrderBiCycleModel.find({ customer: userId });
//     if (!userId) {
//       throw new AppError(StatusCodes.UNAUTHORIZED, 'User not authenticated');
//     }
//     return orders;
//   } catch (error) {
//     throw new AppError(
//       StatusCodes.INTERNAL_SERVER_ERROR,
//       'Failed to fetch orders',
//     );
//   }
// };
// ==============================================demo================================

const updateBiCycleOderIntoDB = async (
  id: string,
  userId: string,
  payload: Partial<TOrderBiCycle>,
) => {
  const order = await OrderBiCycleModel.findById(id);

  if (!order) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Order not found');
  }

  if (order.customer.toString() !== userId) {
    throw new AppError(
      StatusCodes.FORBIDDEN,
      'You are not authorized to update this order',
    );
  }

  const result = await OrderBiCycleModel.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return result;
};

const deleteOrderFromDB = async (id: string, userId: string) => {
  const deleteOrderId = await OrderBiCycleModel.findById(id);
  if (!deleteOrderId) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Order not found');
  }

  if (deleteOrderId?.customer.toString() !== userId) {
    throw new AppError(
      StatusCodes.FORBIDDEN,
      'You are not authorized to delete this blog',
    );
  }

  const result = await OrderBiCycleModel.findByIdAndDelete(id);
  return result;
};

const adminShippingOrder = async (id: string) => {
  // Find the user id
  const orderBiCycle = await OrderBiCycleModel.findById(id);
  // Check if the user exists
  if (!orderBiCycle) {
    throw new Error('Order  not found');
  }

  // Check if the user is already blocked
  if (orderBiCycle.status === 'Shipping') {
    throw new Error('Order is already Shipping ! ');
  }
  const result = await OrderBiCycleModel.findByIdAndUpdate(
    id,
    { status: 'Shipping' },
    {
      new: true,
      runValidators: true,
    },
  );
  return result;
};

const getBiCycleOrder = async (): Promise<{ totalRevenue: number }> => {
  const result = await OrderBiCycleModel.aggregate([
    {
      $lookup: {
        from: 'bicycles',
        localField: 'product',
        foreignField: '_id',
        as: 'bicycleDetails',
      },
    },
    {
      $unwind: '$bicycleDetails',
    },
    {
      $group: {
        _id: null,
        totalRevenue: {
          $sum: {
            $multiply: ['$bicycleDetails.price', '$quantity'],
          },
        },
      },
    },
    {
      $project: {
        _id: 0,
        totalRevenue: 1,
      },
    },
  ]);
  return result[0] || { totalRevenue: 0 };
};

export const orderBiCycleService = {
  createOrderBiCycleService,
  getBiCycleOrder,
  getSingleBiCycleOrderFromDB,
  updateBiCycleOderIntoDB,
  deleteOrderFromDB,
  adminShippingOrder,
  getAllOrdersByUser,
};
