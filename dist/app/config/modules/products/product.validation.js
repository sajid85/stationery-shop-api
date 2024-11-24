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
exports.validateRequest = exports.updateProductSchema = exports.createProductSchema = void 0;
const zod_1 = require("zod");
// Validation schema for creating a product
exports.createProductSchema = zod_1.z.object({
    name: zod_1.z.string().nonempty({ message: 'Name is required' }),
    brand: zod_1.z.string().nonempty({ message: 'Brand is required' }),
    price: zod_1.z.number({ required_error: 'Price is required' }).positive('Price must be a positive number'),
    category: zod_1.z.string({ required_error: 'Category is required' }),
    description: zod_1.z.string({ required_error: 'Description is required' }),
    quantity: zod_1.z.number({ required_error: 'Quantity is required' }).int('Quantity must be an integer').min(0, 'Quantity must be non-negative'),
    inStock: zod_1.z.boolean({ required_error: 'InStock is required' }),
});
// Validation schema for updating a product (allows partial updates)
exports.updateProductSchema = zod_1.z.object({
    name: zod_1.z.string().optional(),
    brand: zod_1.z.string().optional(),
    price: zod_1.z.number().positive('Price must be a positive number').optional(),
    category: zod_1.z.string().optional(),
    description: zod_1.z.string().optional(),
    quantity: zod_1.z.number().int('Quantity must be an integer').min(0, 'Quantity must be non-negative').optional(),
    inStock: zod_1.z.boolean().optional(),
});
// Middleware to validate requests using Zod schemas
const validateRequest = (schema) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            // Validate the request body (synchronously with Zod)
            yield schema.parseAsync(req.body); // Use parseAsync for potential future async schemas
            next(); // Proceed if validation passes
        }
        catch (error) {
            if (error instanceof zod_1.ZodError) {
                // Handle Zod validation errors
                res.status(400).json({
                    success: false,
                    message: 'Validation failed',
                    errors: error.errors.map((err) => ({
                        field: err.path.join('.'),
                        message: err.message,
                    })),
                });
                return;
            }
            // Handle unexpected errors
            res.status(500).json({
                success: false,
                message: 'An unexpected error occurred',
            });
        }
    });
};
exports.validateRequest = validateRequest;
