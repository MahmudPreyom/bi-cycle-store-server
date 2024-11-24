import { TOrderBiCycle } from './biCycle-order.interface';
import OrderBiCycleModel from './biCycle.-order.model';

const createOrderBiCycleService = async (
  data: TOrderBiCycle,
): Promise<TOrderBiCycle> => {
  const result = await OrderBiCycleModel.create(data);
  return result;
};

export const orderBiCycleService = {
  createOrderBiCycleService,
};
