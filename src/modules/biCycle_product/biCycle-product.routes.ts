import { Router } from 'express';
import { cycleController } from './biCycle-product.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../users/user.const';
import { BiCycleProductValidationSchema } from './biCycle-product.validation';
import validateRequest from '../../middlewares/validateRequest';

const BiCycleRouter = Router();

// biCycleRouter.post('/biCycle-create', cycleController.createBiCycle);
BiCycleRouter.post(
  '/',
  auth(USER_ROLE.admin),
  validateRequest(
    BiCycleProductValidationSchema.createBiCycleProductValidationSchema,
  ),
  cycleController.createBiCycle,
);
BiCycleRouter.get('/:productId', cycleController.getSingleBiCycle);
BiCycleRouter.patch(
  '/:productId',
  auth(USER_ROLE.admin),
  cycleController.updateBiCycle,
);
BiCycleRouter.delete(
  '/:productId',
  auth(USER_ROLE.admin),
  cycleController.deleteBiCycle,
);
BiCycleRouter.get('/', cycleController.getBiCycle);

export default BiCycleRouter;
