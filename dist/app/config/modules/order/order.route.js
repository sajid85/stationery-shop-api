"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const order_controller_1 = require("./order.controller");
const order_validation_1 = require("./order.validation");
const orderRouter = (0, express_1.Router)();
orderRouter.post('/', (0, order_validation_1.validateRequest)(order_validation_1.createOrderSchema), // Middleware to validate the request body
order_controller_1.orderController.createOrder);
orderRouter.get('/', order_controller_1.orderController.getAllOrders);
orderRouter.get('/revenue', order_controller_1.orderController.calculateRevenue);
exports.default = orderRouter;
