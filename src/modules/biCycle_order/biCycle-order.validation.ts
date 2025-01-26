import { z } from 'zod';

const createBiCycleOrderValidationSchema = z.object({
  body: z.object({
    product: z.string({ required_error: 'Product must be selected' }),
    quantity: z.string({ required_error: 'Quantity must be provided' }),
    // customer: { type: Schema.Types.ObjectId, ref: 'User' },
    // product: { type: mongoose.Schema.Types.ObjectId, ref: 'BiCycle' },
    // quantity: {
    //   type: Number,
    //   required: true,
    // },
    // totalPrice: {
    //   type: Number,
    //   required: true,
    // },
  }),
});

export const BiCycleOrderValidationSchema = {
  createBiCycleOrderValidationSchema,
};
