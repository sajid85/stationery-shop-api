import { z, ZodError } from 'zod';
import { Request, Response, NextFunction } from 'express';

// Validation schema for creating a product
export const createProductSchema = z.object({
  name: z.string().nonempty({ message: 'Name is required' }),
  brand: z.string().nonempty({ message: 'Brand is required' }),
  price: z.number({ required_error: 'Price is required' }).positive('Price must be a positive number'),
  category: z.string({ required_error: 'Category is required' }),
  description: z.string({ required_error: 'Description is required' }),
  quantity: z.number({ required_error: 'Quantity is required' }).int('Quantity must be an integer').min(0, 'Quantity must be non-negative'),
  inStock: z.boolean({ required_error: 'InStock is required' }),
});

// Validation schema for updating a product (allows partial updates)
export const updateProductSchema = z.object({
  name: z.string().optional(),
  brand: z.string().optional(),
  price: z.number().positive('Price must be a positive number').optional(),
  category: z.string().optional(),
  description: z.string().optional(),
  quantity: z.number().int('Quantity must be an integer').min(0, 'Quantity must be non-negative').optional(),
  inStock: z.boolean().optional(),
});

// Middleware to validate requests using Zod schemas
export const validateRequest = (schema: z.ZodTypeAny) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      // Validate the request body (synchronously with Zod)
      await schema.parseAsync(req.body); // Use parseAsync for potential future async schemas
      next(); // Proceed if validation passes
    } catch (error) {
      if (error instanceof ZodError) {
        // Handle Zod validation errors
        res.status(400).json({
          success: false as const,
          message: 'Validation failed' as const,
          errors: error.errors.map((err) => ({
            field: err.path.join('.'),
            message: err.message,
          })),
        });
        return;
      }

      // Handle unexpected errors
      res.status(500).json({
        success: false as const,
        message: 'An unexpected error occurred' as const,
      });
    }
  };
};