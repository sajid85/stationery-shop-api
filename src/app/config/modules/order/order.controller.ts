import { Request, Response } from 'express';
import { orderService } from './order.service';

export const orderController = {
  // Create a new order
  createOrder: async (req: Request, res: Response) => {
    try {
      const order = await orderService.createOrder(req.body);
      res.status(201).send({
        message: 'Order created successfully',
        status: true,
        data: order,
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
      res.status(400).send({
        message: errorMessage,
        status: false,
      });
    }
  },

  // Calculate revenue
  calculateRevenue: async (_req: Request, res: Response) => {
    try {
      const totalRevenue = await orderService.calculateRevenue();
      res.status(200).send({
        message: 'Revenue calculated successfully',
        status: true,
        data: { totalRevenue },
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
      res.status(500).send({
        message: errorMessage,
        status: false,
      });
    }
  },
};
