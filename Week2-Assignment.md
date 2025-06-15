# 🛠️ Products REST API

This project is a RESTful API built with Node.js and Express.js that allows users to manage a list of products. The API supports standard CRUD operations, middleware functionality, error handling, search, filtering, and pagination.


## 🚀 Getting Started

### Prerequisites
- Node.js and npm must be installed on your machine.

### Installation
1. Clone or download the repository.
2. Navigate to the project directory.
3. Run `npm install` to install dependencies.

### Configuration
- Create a `.env` file in the root directory.
- Copy the content from `.env.example` into `.env` and provide actual values.

### Running the Server
- To start the server in development mode with hot reload, use: `npm run dev`
- To start the server normally, use: `npm start`

The server will start and listen on the port specified in your `.env` file.


## 📚 API Endpoints

All endpoints are prefixed with `/api/products`.

### `GET /api/products`
- Fetches all products.
- Supports query parameters for filtering by category, pagination, and limiting items per page.

### `GET /api/products/:id`
- Fetches a single product by its unique ID.

### `POST /api/products`
- Creates a new product.
- Requires JSON body and API key in request headers.

### `PUT /api/products/:id`
- Updates an existing product by its ID.
- Requires JSON body and API key in request headers.

### `DELETE /api/products/:id`
- Deletes a product by ID.
- Requires API key in request headers.

### `GET /api/products/search`
- Searches for products by name using a query parameter.

### `GET /api/products/stats/category-count`
- Returns the total number of products grouped by category.



## 🔐 Authentication

Some routes (`POST`, `PUT`, `DELETE`) are protected and require an API key to be included in the request headers.



## ❌ Error Handling

Errors are returned in a structured format with appropriate HTTP status codes. Custom error types like `NotFoundError` and `ValidationError` are used to handle specific scenarios. Asynchronous operations are wrapped using `try/catch` or error-handling middleware.

## 👥 Collaboration & Contact

Feel free to fork the repository, contribute, or raise issues.

For collaboration, suggestions, or inquiries, please contact:  
**Email:** yolandaanele81@gmail.com  
**GitHub:** [github.com/AneleMucavele](https://github.com/AneleMucavele)


## 👤 Author

This project was developed for educational purposes to demonstrate backend development using Express.js.
