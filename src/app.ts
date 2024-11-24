import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import biCycleRouter from './modules/biCycle_product/biCycle-product.routes';
import orderBiCycleRouter from './modules/biCycle_order/biCycle-order.routes';
const app: Application = express();

app.use(express.json());
app.use(cors());

app.use('/api/products', biCycleRouter);
app.use('/api/orders', orderBiCycleRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to Bi Cycle Mart');
});
// console.log(process.cwd());
export default app;
