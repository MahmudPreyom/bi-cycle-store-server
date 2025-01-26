import { Router } from 'express';
import { cycleController } from './biCycle-product.controller';

const BiCycleRouter = Router();

// biCycleRouter.post('/biCycle-create', cycleController.createBiCycle);
BiCycleRouter.post('/', cycleController.createBiCycle);
BiCycleRouter.get('/:productId', cycleController.getSingleBiCycle);
BiCycleRouter.put('/:productId', cycleController.updateBiCycle);
BiCycleRouter.delete('/:productId', cycleController.deleteBiCycle);
BiCycleRouter.get('/', cycleController.getBiCycle);

export default BiCycleRouter;
