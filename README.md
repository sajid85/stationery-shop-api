# Stationery Shop API

## Project Description

Welcome to the **Stationery Shop API**! This project is a backend service designed to manage stationery products, handle customer orders, update inventory automatically, and calculate revenue. It’s built for simplicity, scalability, and functionality, making it a great learning project for a backend developer.

You can explore the **live API** [here](https://stationery-shop-api.vercel.app).

---

## Features

### Products Management:

- Add, update, delete, and view products.
- Automatically track inventory status (e.g., `inStock` status updates).

### Order Management:

- Place customer orders.
- Reduce stock levels when an order is placed.
- Handle errors like "Insufficient stock"gracefully.

### Revenue Calculation:

- Calculate total revenue from all customer orders.
- Uses MongoDB’s powerful aggregation pipeline.

### Request Validation:

- Every incoming request is validated using Zod, ensuring clean and predictable data input.

---

## Technology Stack

This project leverages modern web technologies:

- Runtime: Node.js
- Framework: Express.js
- Language: TypeScript
- Database: MongoDB (using Mongoose ODM)
- Validation: Zod
- API Testing: Postman
- Deployment: Vercel

---

## Getting Started

Follow these steps to set up and run the project on your local machine.

### 1. Prerequisites

Ensure you have the following installed:

- Node.js (version 16 or later)
- MongoDB (local instance or MongoDB Atlas for cloud)
- Git (for cloning the repository)

### 2. Installation

npm install
Setup Environment Variables
Create a .env file in the root directory and configure it as follows:

PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/<database-name>
Replace <username>, <password>, and <database-name> with your actual MongoDB credentials.
Run the Application
Build the TypeScript files:

npm run build
Start the development server:
npm run start:dev
Visit the API at:
http://localhost:5000
API Endpoints
Product Routes
Create Product

Endpoint: POST /api/v1/products/createProduct
Request Body:
json
{
"name": "Notebook",
"brand": "Moleskine",
"price": 50,
"category": "Office Supplies",
"description": "A premium notebook for professionals.",
"quantity": 20,
"inStock": true
}
Get All Products

Endpoint: GET /api/v1/products
Update Product

Endpoint: PUT /api/v1/products/:productId
Request Body:
{
"name": "Updated Notebook",
"price": 60
}
Delete Product

Endpoint: DELETE /api/v1/products/:productId
Order Routes
Place an Order

Endpoint: POST /api/v1/orders
Request Body:
json
{
"email": "customer@example.com",
"product": "648a45e5f0123c45678d9012", // Replace with a valid product ID
"quantity": 2,
"totalPrice": 100
}
Calculate Revenue:
Endpoint: GET /api/v1/orders/revenue
The application is deployed on Vercel, providing scalability and speed.

Thank You!
