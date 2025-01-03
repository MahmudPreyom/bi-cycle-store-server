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
      message: 'Insufficient stock for the requested product',
      error,
    });
  }
};

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
