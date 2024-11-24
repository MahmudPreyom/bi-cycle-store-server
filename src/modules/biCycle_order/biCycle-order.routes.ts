import { Router } from 'express';
import { orderBiCycleController } from './biCycle-order.controller';

const orderBiCycleRouter = Router();

orderBiCycleRouter.post('/', orderBiCycleController.createOrderBiCycle);

export default orderBiCycleRouter;
