import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import productRouter from './app/config/modules/products/product.route';
import orderRouter from './app/config/modules/order/order.route'; 

const app: Application = express();

// Parsers
app.use(express.json());
app.use(cors());

// Application Routes
app.use('/api/v1/products', productRouter); 
app.use('/api/v1/orders', orderRouter); 

// Root Route
app.get('/', (req: Request, res: Response) => {
  res.send({
    status: 200,
    message: 'Welcome to the Stationery Shop API!',
  });
});

export default app;
