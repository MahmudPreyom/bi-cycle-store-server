/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
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
    data: result,
  });
});

const getBiCycleOrderData = catchAsync(async (req, res) => {
  const biCycleOrderId = req.params.orderId;
  const result =
    await orderBiCycleService.getSingleBiCycleOrderFromDB(biCycleOrderId);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Order Retrieved successfully',
    data: result,
  });
});

const updateBiCycleOrder = catchAsync(async (req, res) => {
  const { orderId } = req.params;
  const userId = req.user?._id;
  const result = await orderBiCycleService.updateBiCycleOderIntoDB(
    orderId,
    userId,
    req.body,
  );

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Update Order bicycle successfully',
    data: result,
  });
});

const deleteOrder = catchAsync(async (req, res) => {
  const { orderId } = req.params;
  const userId = req.user?._id;

  const result = await orderBiCycleService.deleteOrderFromDB(orderId, userId);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Order deleted successfully',
  });
});

const adminShippingOrder = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await orderBiCycleService.adminShippingOrder(id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Order Shipping successfully',
    data: result,
  });
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
  getBiCycleOrderData,
  updateBiCycleOrder,
  adminShippingOrder,
  deleteOrder,
};
