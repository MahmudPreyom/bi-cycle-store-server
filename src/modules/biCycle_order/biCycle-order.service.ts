import BiCycle from '../biCycle_product/biCycle-product.model';
import { TOrderBiCycle } from './biCycle-order.interface';
import OrderBiCycleModel from './biCycle.-order.model';

const createOrderBiCycleService = async (
  data: TOrderBiCycle,
): Promise<TOrderBiCycle> => {
  const { product, quantity } = data;
  const bicycle = await BiCycle.findById(product);

  if (!bicycle) {
    throw new Error('Product not found');
  }

  if (bicycle.quantity < quantity) {
    throw new Error('Insufficient stock for the requested product.');
  }

  bicycle.quantity -= quantity;
  bicycle.inStock = bicycle.quantity > 0;

  await bicycle.save();

  const result = await OrderBiCycleModel.create(data);
  return result;
};

const getBiCycleOrder = async (): Promise<{ totalRevenue: number }> => {
  const result = await OrderBiCycleModel.aggregate([
    {
      $lookup: {
        from: 'bicycles',
        localField: 'product',
        foreignField: '_id',
        as: 'bicycleDetails',
      },
    },
    {
      $unwind: '$bicycleDetails',
    },
    {
      $group: {
        _id: null,
        totalRevenue: {
          $sum: {
            $multiply: ['$bicycleDetails.price', '$quantity'],
          },
        },
      },
    },
    {
      $project: {
        _id: 0,
        totalRevenue: 1,
      },
    },
  ]);
  return result[0] || { totalRevenue: 0 };
};

export const orderBiCycleService = {
  createOrderBiCycleService,
  getBiCycleOrder,
};
