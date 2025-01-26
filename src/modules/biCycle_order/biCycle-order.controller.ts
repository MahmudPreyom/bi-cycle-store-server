import { Request, Response } from 'express';
import { orderBiCycleService } from './biCycle-order.service';
import AppError from '../../app/errors/AppError';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';

const createOrderBiCycle = catchAsync(async (req, res) => {
  const customer = req.user?._id;

  if (!customer) {
    throw new AppError(StatusCodes.UNAUTHORIZED, 'User Not Authenticated');
  }
  const biCycleOrderData = {
    ...req.body,
    customer: customer,
  };

  const result = await orderBiCycleService.createOrderBiCycleService(
    biCycleOrderData,
    customer,
  );
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'Order created successfully',
    data: {
      price: result.totalPrice,
      product: result.product,
      quantity: result?.quantity,
      customer: result?.customer,
    },
  });
  // try {
  //   const data = req.body;
  //   // const userId = req.user?._id;
  //   const result = await orderBiCycleService.createOrderBiCycleService(
  //     data,
  //     // userId,
  //   );
  //   res.json({
  //     message: 'Order created successfully',
  //     success: true,
  //     data: result,
  //     // userEmail: userId.email,
  //   });
  // } catch (error) {
  //   res.json({
  //     status: false,
  //     message: 'Insufficient stock for the requested product',
  //     error,
  //   });
  // }
});

const getBiCycleOrderController = async (req: Request, res: Response) => {
  try {
    const result = await orderBiCycleService.getBiCycleOrder();

    res.send({
      message: 'Revenue calculated successfully',
      status: true,
      data: result,
    });
  } catch (error) {
    res.json({
      status: false,
      message: 'Something went wrong',
      error,
    });
  }
};

export const orderBiCycleController = {
  createOrderBiCycle,
  getBiCycleOrderController,
};
