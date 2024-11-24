"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const product_route_1 = __importDefault(require("./app/config/modules/products/product.route"));
const order_route_1 = __importDefault(require("./app/config/modules/order/order.route"));
const app = (0, express_1.default)();
// Parsers
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// Application Routes
app.use('/api/v1/products', product_route_1.default);
app.use('/api/v1/orders', order_route_1.default);
// Root Route
app.get('/', (req, res) => {
    res.send({
        status: 200,
        message: 'Welcome to the Stationery Shop API!',
    });
});
exports.default = app;
