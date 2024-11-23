import express, { Application, Request, Response } from 'express';
const app: Application = express();

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to Bi Cycle Mart');
});
console.log(process.cwd());
export default app;
