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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productController = void 0;
const product_service_1 = require("./product.service");
// Create a Stationery Product
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('Create Product Request Body:', req.body);
        const _a = req.body, { _id } = _a, body = __rest(_a, ["_id"]);
        const result = yield product_service_1.productService.createProduct(body);
        res.status(201).send({
            success: true,
            message: 'Product created successfully',
            result,
        });
    }
    catch (error) {
        console.error('Error creating product:', error);
        res.status(500).send({
            success: false,
            message: 'Failed to create product',
            error: error instanceof Error ? error.message : 'Internal Server Error',
        });
    }
});
// Get All Stationery Products
const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const searchTerm = req.query.searchTerm;
        const result = yield product_service_1.productService.getProducts(searchTerm);
        res.status(200).send({
            success: true,
            message: 'Products retrieved successfully',
            result,
        });
    }
    catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).send({
            success: false,
            message: 'Failed to fetch products',
            error: error instanceof Error ? error.message : 'Internal Server Error',
        });
    }
});
// Get a Specific Stationery Product
const getSingleProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.productId;
        const result = yield product_service_1.productService.getSingleProduct(id);
        res.status(200).send({
            success: true,
            message: 'Product retrieved successfully',
            result,
        });
    }
    catch (error) {
        console.error('Error fetching product:', error);
        res.status(500).send({
            success: false,
            message: 'Failed to fetch product',
            error: error instanceof Error ? error.message : 'Internal Server Error',
        });
    }
});
// Update a Stationery Product
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.productId;
        const _a = req.body, { _id } = _a, body = __rest(_a, ["_id"]);
        // Update and return the updated product
        const result = yield product_service_1.productService.updateProduct(id, body);
        if (!result) {
            return res.status(404).send({
                success: false,
                message: 'Product not found',
            });
        }
        // Fetch the updated product data to ensure it's returned
        const updatedProduct = yield product_service_1.productService.getSingleProduct(id);
        res.status(200).send({
            success: true,
            message: 'Product updated successfully',
            result: updatedProduct,
        });
    }
    catch (error) {
        console.error('Error updating product:', error);
        res.status(500).send({
            success: false,
            message: 'Failed to update product',
            error: error instanceof Error ? error.message : 'Internal Server Error',
        });
    }
});
// Delete a Stationery Product
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.productId;
        const result = yield product_service_1.productService.deleteProduct(id);
        if (!result) {
            return res.status(404).send({
                success: false,
                message: 'Product not found',
            });
        }
        res.status(200).send({
            success: true,
            message: 'Product deleted successfully',
            result,
        });
    }
    catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).send({
            success: false,
            message: 'Failed to delete product',
            error: error instanceof Error ? error.message : 'Internal Server Error',
        });
    }
});
exports.productController = {
    createProduct,
    getProducts,
    getSingleProduct,
    updateProduct,
    deleteProduct,
};
