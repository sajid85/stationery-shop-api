import { model, Schema } from 'mongoose';
import TProductModel, { IProduct, IProductMethods, ProductCategory } from './product.interface';

const productSchema = new Schema<IProduct, TProductModel, IProductMethods>({
  name: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    enum: Object.values(ProductCategory),
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  inStock: {
    type: Boolean,
    required: true,
  },
});

productSchema.methods.isAvailable = function () {
  return this.quantity > 0 && this.inStock;
};

productSchema.static('getAvailableProducts', async function getAvailableProducts() {
  return this.find({ inStock: true, quantity: { $gt: 0 } });
});

const Product = model<IProduct, TProductModel>('Product', productSchema);

export default Product;