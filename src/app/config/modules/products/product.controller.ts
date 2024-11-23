import { Request, Response } from 'express';
import { productService } from './product.service';

// Create a Stationery Product
const createProduct = async (req: Request, res: Response) => {
  try {
    console.log('Create Product Request Body:', req.body);

    // Sanitize the payload by excluding _id
    const { _id, ...body } = req.body;

    // Pass sanitized payload to the service
    const result = await productService.createProduct(body);

    res.status(201).send({
      success: true,
      message: 'Product created successfully',
      result,
    });
  } catch (error) {
    console.error('Error creating product:', error); // Log the error
    res.status(500).send({
      success: false,
      message: 'Failed to create product',
      error: error instanceof Error ? error.message : 'Internal Server Error',
    });
  }
};

// Get All Stationery Products
const getProducts = async (req: Request, res: Response) => {
  try {
    const searchTerm = req.query.searchTerm as string;

    // Fetch products using the service
    const result = await productService.getProducts(searchTerm);

    res.status(200).send({
      success: true,
      message: 'Products retrieved successfully',
      result,
    });
  } catch (error) {
    console.error('Error fetching products:', error); // Log the error
    res.status(500).send({
      success: false,
      message: 'Failed to fetch products',
      error: error instanceof Error ? error.message : 'Internal Server Error',
    });
  }
};

// Get a Specific Stationery Product
const getSingleProduct = async (req: Request, res: Response) => {
  try {
    const id = req.params.productId;

    // Fetch product by ID using the service
    const result = await productService.getSingleProduct(id);

    res.status(200).send({
      success: true,
      message: 'Product retrieved successfully',
      result,
    });
  } catch (error) {
    console.error('Error fetching product:', error); // Log the error
    res.status(500).send({
      success: false,
      message: 'Failed to fetch product',
      error: error instanceof Error ? error.message : 'Internal Server Error',
    });
  }
};

// Update a Stationery Product
const updateProduct = async (req: Request, res: Response) => {
  try {
    const id = req.params.productId;

    // Sanitize the payload by excluding _id
    const { _id, ...body } = req.body;

    // Update product using the service
    const result = await productService.updateProduct(id, body);

    res.status(200).send({
      success: true,
      message: 'Product updated successfully',
      result,
    });
  } catch (error) {
    console.error('Error updating product:', error); // Log the error
    res.status(500).send({
      success: false,
      message: 'Failed to update product',
      error: error instanceof Error ? error.message : 'Internal Server Error',
    });
  }
};

// Delete a Stationery Product
const deleteProduct = async (req: Request, res: Response) => {
  try {
    const id = req.params.productId;

    // Delete product using the service
    const result = await productService.deleteProduct(id);

    res.status(200).send({
      success: true,
      message: 'Product deleted successfully',
      result,
    });
  } catch (error) {
    console.error('Error deleting product:', error); // Log the error
    res.status(500).send({
      success: false,
      message: 'Failed to delete product',
      error: error instanceof Error ? error.message : 'Internal Server Error',
    });
  }
};

export const productController = {
  createProduct,
  getProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};
