import { Order } from './order.model';
import Product from '../products/product.model';

export const orderService = {
  createOrder: async (orderData: any) => {
    const { email, product, quantity } = orderData;

    const productDetails = await Product.findById(product);

    if (!productDetails) {
      throw new Error('Product not found');
    }

    if (productDetails.quantity < quantity) {
      throw new Error('Insufficient stock available');
    }

    const totalPrice = productDetails.price * quantity;

    const order = await Order.create({
      email,
      product,
      quantity,
      totalPrice,
    });

    productDetails.quantity -= quantity;
    if (productDetails.quantity === 0) {
      productDetails.inStock = false;
    }
    await productDetails.save();

    return order;
  },

  getAllOrders: async () => {
    return await Order.find().populate('product');
  },

  calculateRevenue: async () => {
    const result = await Order.aggregate([
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: '$totalPrice' },
        },
      },
    ]);
    return result[0]?.totalRevenue || 0;
  },
};
