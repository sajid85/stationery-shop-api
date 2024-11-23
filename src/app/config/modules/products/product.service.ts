import { IProduct } from './product.interface';
import Product from './product.model';

// Create a Stationery Product
const createProduct = async (payload: IProduct) => {
  const product = new Product(payload);
  const result = await product.save();
  return {
    message: 'Product created successfully',
    success: true,
    data: result,
  };
};

// Get All Stationery Products
const getProducts = async (searchTerm?: string) => {
  const filter = searchTerm
    ? {
        $or: [
          { name: { $regex: searchTerm, $options: 'i' } },
          { brand: { $regex: searchTerm, $options: 'i' } },
          { category: { $regex: searchTerm, $options: 'i' } },
        ],
      }
    : {};
  const result = await Product.find(filter);
  return {
    message: 'Products retrieved successfully',
    status: true,
    data: result,
  };
};

// Get a Specific Stationery Product
const getSingleProduct = async (id: string) => {
  const result = await Product.findById(id);
  return {
    message: 'Product retrieved successfully',
    status: true,
    data: result,
  };
};

// Update a Stationery Product
const updateProduct = async (id: string, payload: Partial<IProduct>) => {
  const result = await Product.findByIdAndUpdate(id, payload, { new: true });
  return {
    message: 'Product updated successfully',
    status: true,
    data: result,
  };
};

// Delete a Stationery Product
const deleteProduct = async (id: string) => {
  await Product.findByIdAndDelete(id);
  return {
    message: 'Product deleted successfully',
    status: true,
    data: {},
  };
};

export const productService = {
  createProduct,
  getProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};

