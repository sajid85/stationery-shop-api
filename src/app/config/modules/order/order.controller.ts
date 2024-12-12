import { Request, Response } from 'express';
import { orderService } from './order.service';

export const orderController = {
  createOrder: async (req: Request, res: Response): Promise<void> => {
    try {
      const order = await orderService.createOrder(req.body);
      res.status(201).send({
        message: 'Order created successfully',
        status: true,
        data: order,
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
      res.status(500).send({
        message: errorMessage,
        status: false,
      });
    }
  },

  getAllOrders: async (_req: Request, res: Response): Promise<void> => {
    try {
      const orders = await orderService.getAllOrders();
      res.status(200).send({
        message: 'Orders retrieved successfully',
        status: true,
        data: orders,
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
      res.status(500).send({
        message: errorMessage,
        status: false,
      });
    }
  },

  calculateRevenue: async (_req: Request, res: Response): Promise<void> => {
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
