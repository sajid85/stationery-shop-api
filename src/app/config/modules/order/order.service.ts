import { Order } from './order.model';
import Product from '../products/product.model';

export const orderService = {
  // Create a new order
  createOrder: async (orderData: any) => {
    const { email, product, quantity } = orderData;

    // Fetch the product details
    const productDetails = await Product.findById(product);

    if (!productDetails) {
      throw new Error('Product not found');
    }

    // Check if enough stock is available
    if (productDetails.quantity < quantity) {
      throw new Error('Insufficient stock available');
    }

    // Calculate the total price
    const totalPrice = productDetails.price * quantity;

    // Create the order
    const order = await Order.create({
      email,
      product,
      quantity,
      totalPrice,
    });

    // Update product stock
    productDetails.quantity -= quantity;
    if (productDetails.quantity === 0) {
      productDetails.inStock = false;
    }
    await productDetails.save();

    return order;
  },

  // Calculate total revenue from all orders
  calculateRevenue: async () => {
    const result = await Order.aggregate([
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: '$totalPrice' }, // Sum the `totalPrice` field
        },
      },
    ]);

    return result[0]?.totalRevenue || 0; // Return totalRevenue or 0 if no orders
  },
};
