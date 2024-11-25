import { Request, Response } from 'express';
import { orderBiCycleService } from './biCycle-order.service';

const createOrderBiCycle = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const result = await orderBiCycleService.createOrderBiCycleService(data);
    res.json({
      message: 'Order created successfully',
      success: true,
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

const getBiCycleOrderController = async (req: Request, res: Response) => {
  try {
    const result = await orderBiCycleService.getBiCycleOrder();

    res.send({
      message: 'Order Bicycles retrieved successfully',
      status: true,
      result,
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
