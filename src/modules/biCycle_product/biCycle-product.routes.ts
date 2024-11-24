import { Router } from 'express';
import { cycleController } from './biCycle-product.controller';

const biCycleRouter = Router();

biCycleRouter.post('/biCycle-create', cycleController.createBiCycle);
biCycleRouter.get('/:productId', cycleController.getSingleBiCycle);
biCycleRouter.put('/:productId', cycleController.updateBiCycle);
biCycleRouter.delete('/:productId', cycleController.deleteBiCycle);
biCycleRouter.get('/', cycleController.queryBiCycleProduct);
biCycleRouter.get('/', cycleController.getBiCycle);

export default biCycleRouter;
