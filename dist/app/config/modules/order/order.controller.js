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
exports.orderController = void 0;
const order_service_1 = require("./order.service");
exports.orderController = {
    createOrder: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const order = yield order_service_1.orderService.createOrder(req.body);
            res.status(201).send({
                message: 'Order created successfully',
                status: true,
                data: order,
            });
        }
        catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
            res.status(500).send({
                message: errorMessage,
                status: false,
            });
        }
    }),
    getAllOrders: (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const orders = yield order_service_1.orderService.getAllOrders();
            res.status(200).send({
                message: 'Orders retrieved successfully',
                status: true,
                data: orders,
            });
        }
        catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
            res.status(500).send({
                message: errorMessage,
                status: false,
            });
        }
    }),
    calculateRevenue: (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const totalRevenue = yield order_service_1.orderService.calculateRevenue();
            res.status(200).send({
                message: 'Revenue calculated successfully',
                status: true,
                data: { totalRevenue },
            });
        }
        catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
            res.status(500).send({
                message: errorMessage,
                status: false,
            });
        }
    }),
};
