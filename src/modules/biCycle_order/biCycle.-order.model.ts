import { Schema, model } from 'mongoose';
import { TOrderBiCycle } from './biCycle-order.interface';

const OrderBiCycleSchema = new Schema<TOrderBiCycle>(
  {
    email: { type: String, required: false },
    customer: { type: Schema.Types.ObjectId, ref: 'User' },
    product: { type: Schema.Types.ObjectId, unique: false, ref: 'BiCycle' },
    quantity: {
      type: Number,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ['Pending', 'Shipping'],
      default: 'Pending',
    },
  },
  {
    timestamps: true,
  },
);

export const OrderBiCycleModel = model<TOrderBiCycle>(
  'Order',
  OrderBiCycleSchema,
);

// export default OrderBiCycleModel;
