import { HydratedDocument, Model } from 'mongoose';

export enum ProductCategory {
  Writing = 'Writing',
  OfficeSupplies = 'Office Supplies',
  ArtSupplies = 'Art Supplies',
  Educational = 'Educational',
  Technology = 'Technology'
}

export interface IProduct {
  name: string;
  brand: string;
  price: number;
  category: ProductCategory;
  description: string;
  quantity: number;
  inStock: boolean;
}

export interface IProductMethods {
  isAvailable(): boolean;
}

interface TProductModel extends Model<IProduct, Record<string, unknown>, IProductMethods> {
  getAvailableProducts(): Promise<HydratedDocument<IProduct, IProductMethods>[]>;
}

export default TProductModel;
