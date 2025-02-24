import { Router } from 'express';
import { orderBiCycleController } from './biCycle-order.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../users/user.const';

const OrderBiCycleRouter = Router();

OrderBiCycleRouter.post(
  '/',
  auth('customer'),
  orderBiCycleController.createOrderBiCycle,
);
OrderBiCycleRouter.get(
  '/revenue',
  auth(USER_ROLE.admin),
  orderBiCycleController.getBiCycleOrderController,
);
OrderBiCycleRouter.get(
  '/:orderId',
  auth(USER_ROLE.user, USER_ROLE.admin),
  orderBiCycleController.getBiCycleOrderData,
);
// ===============================================demo=========================
OrderBiCycleRouter.get(
  // '/order/:userId',
  '/order/my-orders',
  auth(USER_ROLE.user, USER_ROLE.admin),
  orderBiCycleController.getUserOrders,
);
// =======================================================demo==================

OrderBiCycleRouter.patch(
  '/:orderId',
  auth(USER_ROLE.user),
  orderBiCycleController.updateBiCycleOrder,
);
OrderBiCycleRouter.patch(
  '/orderShipping/:id',
  auth(USER_ROLE.admin),
  orderBiCycleController.adminShippingOrder,
);
OrderBiCycleRouter.delete(
  '/:orderId',
  auth(USER_ROLE.user),
  orderBiCycleController.deleteOrder,
);

export default OrderBiCycleRouter;
