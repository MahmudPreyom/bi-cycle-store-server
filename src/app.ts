import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import BiCycleRouter from './modules/biCycle_product/biCycle-product.routes';
import OrderBiCycleRouter from './modules/biCycle_order/biCycle-order.routes';
import UserRoutes from './modules/users/user.routes';
import authRoutes from './modules/auth/auth.routes';
import globalErrorHandler from './middlewares/globalErrorHandler';
const app: Application = express();

app.use(express.json());
app.use(cors());

app.use('/api/auth', authRoutes);
app.use('/api/products', BiCycleRouter);
app.use('/api/orders', OrderBiCycleRouter);
app.use('/api/user', UserRoutes);

app.use(globalErrorHandler);

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to Bi Cycle Mart');
});
// console.log(process.cwd());
export default app;
