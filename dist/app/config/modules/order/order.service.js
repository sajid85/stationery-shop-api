"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderService = void 0;
const order_model_1 = require("./order.model");
const product_model_1 = __importDefault(require("../products/product.model"));
exports.orderService = {
    // Create a new order
    createOrder: (orderData) => __awaiter(void 0, void 0, void 0, function* () {
        const { email, product, quantity } = orderData;
        // Fetch the product details
        const productDetails = yield product_model_1.default.findById(product);
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
        const order = yield order_model_1.Order.create({
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
        yield productDetails.save();
        return order;
    }),
    // Calculate total revenue from all orders
    calculateRevenue: () => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const result = yield order_model_1.Order.aggregate([
            {
                $group: {
                    _id: null,
                    totalRevenue: { $sum: '$totalPrice' }, // Sum the `totalPrice` field
                },
            },
        ]);
        return ((_a = result[0]) === null || _a === void 0 ? void 0 : _a.totalRevenue) || 0; // Return totalRevenue or 0 if no orders
    }),
};
