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
exports.productService = void 0;
const product_model_1 = __importDefault(require("./product.model"));
// Create a Stationery Product
const createProduct = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const product = new product_model_1.default(payload);
    const result = yield product.save();
    return {
        message: 'Product created successfully',
        success: true,
        data: result,
    };
});
// Get All Stationery Products
const getProducts = (searchTerm) => __awaiter(void 0, void 0, void 0, function* () {
    const filter = searchTerm
        ? {
            $or: [
                { name: { $regex: searchTerm, $options: 'i' } },
                { brand: { $regex: searchTerm, $options: 'i' } },
                { category: { $regex: searchTerm, $options: 'i' } },
            ],
        }
        : {};
    const result = yield product_model_1.default.find(filter);
    return {
        message: 'Products retrieved successfully',
        status: true,
        data: result,
    };
});
// Get a Specific Stationery Product
const getSingleProduct = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.default.findById(id);
    return {
        message: 'Product retrieved successfully',
        status: true,
        data: result,
    };
});
// Update a Stationery Product
const updateProduct = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.default.findByIdAndUpdate(id, payload, { new: true });
    return {
        message: 'Product updated successfully',
        status: true,
        data: result,
    };
});
// Delete a Stationery Product
const deleteProduct = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield product_model_1.default.findByIdAndDelete(id);
    return {
        message: 'Product deleted successfully',
        status: true,
        data: {},
    };
});
exports.productService = {
    createProduct,
    getProducts,
    getSingleProduct,
    updateProduct,
    deleteProduct,
};
