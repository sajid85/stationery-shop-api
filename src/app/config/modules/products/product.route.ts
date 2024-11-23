import { Router } from 'express';
import { productController } from './product.controller';
import { validateRequest, createProductSchema, updateProductSchema } from './product.validation';

const productRouter = Router();

// Get all products
productRouter.get('/', productController.getProducts);

// Get a single product by ID
productRouter.get('/:productId', productController.getSingleProduct);

// Create a product with validation
productRouter.post(
  '/createProduct',
  validateRequest(createProductSchema), // Validate the request body
  productController.createProduct
);

// Update a product with validation
productRouter.put(
  '/:productId',
  validateRequest(updateProductSchema), // Validate the request body
  productController.updateProduct
);

// Delete a product
productRouter.delete('/:productId', productController.deleteProduct);

export default productRouter;
