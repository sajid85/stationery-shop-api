import { z } from 'zod';

// Validation schema for creating an order
export const createOrderSchema = z.object({
  email: z.string().email('Invalid email address'), // Validate email format
  product: z.string().regex(/^[a-f\d]{24}$/i, 'Invalid productId format'), // Validate MongoDB ObjectId
  quantity: z.number().min(1, 'Quantity must be at least 1'), // Minimum quantity of 1
  totalPrice: z.number().positive('Total price must be positive'), // Total price validation
});

// Middleware to validate requests using Zod schemas
export const validateRequest = (schema: z.ZodTypeAny) => {
  return async (req: any, res: any, next: Function) => {
    try {
      await schema.parseAsync(req.body); // Parse and validate request body asynchronously
      next(); // Proceed if validation passes
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Return detailed validation errors
        return res.status(400).json({
          success: false,
          message: 'Validation failed',
          errors: error.errors.map((err) => ({
            field: err.path.join('.'),
            message: err.message,
          })),
        });
      }
      // Handle unexpected errors
      res.status(500).json({
        success: false,
        message: 'Unexpected error occurred',
      });
    }
  };
};
