import { Router } from 'express';
import { orderController } from './order.controller';
import { validateRequest, createOrderSchema } from './order.validation';

const orderRouter = Router();

// Place an order
orderRouter.post(
  '/',
  validateRequest(createOrderSchema), // Validate request body
  orderController.createOrder
);

// Calculate revenue
orderRouter.get('/revenue', orderController.calculateRevenue);

export default orderRouter;
