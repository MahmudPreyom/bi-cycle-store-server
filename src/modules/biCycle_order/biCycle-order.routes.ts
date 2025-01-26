import { Router } from 'express';
import { orderBiCycleController } from './biCycle-order.controller';
import auth from '../../middlewares/auth';

const OrderBiCycleRouter = Router();

OrderBiCycleRouter.post(
  '/',
  auth('customer'),
  orderBiCycleController.createOrderBiCycle,
);
OrderBiCycleRouter.get(
  '/revenue',
  auth('admin'),
  orderBiCycleController.getBiCycleOrderController,
);

export default OrderBiCycleRouter;
