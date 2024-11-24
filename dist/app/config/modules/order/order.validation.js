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
exports.validateRequest = exports.createOrderSchema = void 0;
const zod_1 = require("zod");
// Validation schema for creating an order
exports.createOrderSchema = zod_1.z.object({
    email: zod_1.z.string().email('Invalid email address'), // Validate email format
    product: zod_1.z.string().regex(/^[a-f\d]{24}$/i, 'Invalid productId format'), // Validate MongoDB ObjectId
    quantity: zod_1.z.number().min(1, 'Quantity must be at least 1'), // Minimum quantity of 1
    totalPrice: zod_1.z.number().positive('Total price must be positive'), // Total price validation
});
// Middleware to validate requests using Zod schemas
const validateRequest = (schema) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield schema.parseAsync(req.body); // Parse and validate request body asynchronously
            next(); // Proceed if validation passes
        }
        catch (error) {
            if (error instanceof zod_1.z.ZodError) {
                // Return detailed validation errors
                return res.status(400).json({
                    success: false,
                    message: 'Validation failed',
                    errors: error.errors.map((err) => ({
                        field: err.path.join('.'),
                        message: err.message,
                    })),
                });
            }
            // Handle unexpected errors
            res.status(500).json({
                success: false,
                message: 'Unexpected error occurred',
            });
        }
    });
};
exports.validateRequest = validateRequest;
