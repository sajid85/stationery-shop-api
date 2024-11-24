"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_controller_1 = require("./product.controller");
const product_validation_1 = require("./product.validation");
const productRouter = (0, express_1.Router)();
// Get all products
productRouter.get('/', product_controller_1.productController.getProducts);
// Get a single product by ID
productRouter.get('/:productId', product_controller_1.productController.getSingleProduct);
// Create a product with validation
productRouter.post('/createProduct', (0, product_validation_1.validateRequest)(product_validation_1.createProductSchema), // Validate the request body
product_controller_1.productController.createProduct);
// Update a product with validation
productRouter.put('/:productId', (0, product_validation_1.validateRequest)(product_validation_1.updateProductSchema), // Validate the request body
product_controller_1.productController.updateProduct);
// Delete a product
productRouter.delete('/:productId', product_controller_1.productController.deleteProduct);
exports.default = productRouter;
