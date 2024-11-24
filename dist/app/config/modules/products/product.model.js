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
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const product_interface_1 = require("./product.interface");
const productSchema = new mongoose_1.Schema({
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
        enum: Object.values(product_interface_1.ProductCategory),
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
productSchema.static('getAvailableProducts', function getAvailableProducts() {
    return __awaiter(this, void 0, void 0, function* () {
        return this.find({ inStock: true, quantity: { $gt: 0 } });
    });
});
const Product = (0, mongoose_1.model)('Product', productSchema);
exports.default = Product;
