import { TOrderBiCycle } from './biCycle-order.interface';
import OrderBiCycleModel from './biCycle.-order.model';

const createOrderBiCycleService = async (
  data: TOrderBiCycle,
): Promise<TOrderBiCycle> => {
  const result = await OrderBiCycleModel.create(data);
  return result;
};

const getBiCycleOrder = async () => {
  const result = await OrderBiCycleModel.find();
  return result;
};

export const orderBiCycleService = {
  createOrderBiCycleService,
  getBiCycleOrder,
};
