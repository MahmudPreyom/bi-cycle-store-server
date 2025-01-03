import { TBiCycle } from './biCycle-product.interface';
import BiCycle from './biCycle-product.model';

const createBiCycleProduct = async (data: TBiCycle): Promise<TBiCycle> => {
  const result = await BiCycle.create(data);
  return result;
};

const getBiCycle = async (searchTerm: string | undefined) => {
  let query = {};

  if (searchTerm) {
    const regex = new RegExp(searchTerm, 'i');
    query = {
      $or: [{ name: regex }, { brand: regex }, { type: regex }],
    };
  }
  const result = await BiCycle.find(query);
  return result;
};

const getSingleBiCycle = async (id: string) => {
  const result = await BiCycle.findById(id);
  return result;
};

const updateBiCycle = async (id: string, data: TBiCycle) => {
  const result = await BiCycle.findByIdAndUpdate(id, data, {
    new: true,
  });
  return result;
};

const deleteBiCycle = async (id: string) => {
  const result = await BiCycle.findByIdAndDelete(id);
  return result;
};

export const biCycleProductService = {
  createBiCycleProduct,
  getBiCycle,
  getSingleBiCycle,
  updateBiCycle,
  deleteBiCycle,
};
