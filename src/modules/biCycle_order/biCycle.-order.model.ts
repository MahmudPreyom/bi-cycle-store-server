import mongoose, { Schema, model } from 'mongoose';
import { TOrderBiCycle } from './biCycle-order.interface';

const OrderBiCycleSchema: Schema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'BiCycle' },
    quantity: {
      type: Number,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const OrderBiCycleModel = model<TOrderBiCycle>('Order', OrderBiCycleSchema);

export default OrderBiCycleModel;
