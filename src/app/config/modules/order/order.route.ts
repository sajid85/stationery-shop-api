import { Router } from 'express';
import { orderController } from './order.controller';
import { validateRequest, createOrderSchema } from './order.validation';

const orderRouter = Router();

orderRouter.post(
  '/',
  validateRequest(createOrderSchema), // Middleware to validate the request body
  orderController.createOrder
);

orderRouter.get(
  '/',
  orderController.getAllOrders
);

orderRouter.get(
  '/revenue',
  orderController.calculateRevenue
);

export default orderRouter;
