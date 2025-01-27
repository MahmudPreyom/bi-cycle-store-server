import { Types } from 'mongoose';

export type TOrderBiCycle = {
  email?: string;
  customer: Types.ObjectId;
  product: Types.ObjectId;
  quantity: number;
  totalPrice: number;
  status?: 'Pending' | 'Shipping';
  // orderStatus: ''
};
