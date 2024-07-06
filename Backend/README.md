# Book Store Platform Backend

## Overview

This backend is built for a Book Store Platform. It provides RESTful API endpoints for authentication, book management, cart operations, order processing, review management, and administrative tasks. The backend is implemented using Node.js, Express, and MongoDB.

## Project Structure

```css
backend/
├── node_modules/
├── public/
├── src/
│   ├── config/
│   │   └── db.config.js
│   ├── controller/
│   │   ├── address.controller.js
│   │   ├── auth.controller.js
│   │   ├── book.controller.js
│   │   ├── cart.controller.js
│   │   ├── categories.controller.js
│   │   ├── order.controller.js
│   │   └── user.controller.js
│   ├── middleware/
│   ├── model/
│   │   ├── address.model.js
│   │   ├── books.model.js
│   │   ├── cart.model.js
│   │   ├── categories.model.js
│   │   ├── order.model.js
│   │   └── user.model.js
│   ├── routes/
│   │   ├── address.route.js
│   │   ├── auth.route.js
│   │   ├── book.route.js
│   │   ├── cart.route.js
│   │   ├── category.route.js
│   │   └── order.route.js
│   ├── utils/
│   │   ├── app.js
│   │   ├── constants.js
│   │   └── index.js
│   └── .env
├── .gitignore
├── .prettierrc
├── .prettierignore
├── eslint.config.js
├── package-lock.json
├── package.json
└── README.md
```

## Prerequisites

- Node.js
- MongoDB

## Installation

Clone the repository :

```sh
git clone git@github.com:sahilghadi47/book_store.git
cd backend
Install dependencies:
```

```sh
npm install
```

Create a .env file in the src directory and configure the following environment variables :

```env
PORT =
CORS =
# jwt auth config

ACCESS_TOKEN_SECRET =
ACCESS_TOKEN_EXPIRY=

REFRESH_TOKEN_SECRET=
REFRESH_TOKEN_EXPIRY=

# cloud config
CLOUDINARY_CLOUD_NAME =
CLOUDINARY_API_KEY =
CLOUDINARY_API_SECRET =

# DB config
MONGO_URI =
DB_NAME =
```

start the server :

```sh
npm start
```

## API Endpoints

All api use <http://{server}:{port}/api/v1> as prefix

### Auth Controller

Handles user-related operations such as registration, login, profile management, etc.

- **Register user : post("/register", registerUser);**
- **Login user : post("/login", loginUser);**
- **Update user credentials : patch("/refresh-tokens", verifyJwt, updateTokens);**
- **Logout user : get("/logout", verifyJwt, logoutUser);**
- **Update User pasword : patch("/update-password", verifyJwt, updatePassword);**
- **Update user Role : patch("/update-role", verifyJwt, hasRole("admin"), updateUserRole);**
- **get all user : get("/users", verifyJwt, hasRole("admin"), getAllUsers);**
- **Delete user : delete("/users/:id", verifyJwt, hasRole("admin"), deleteUser);**

---

### Book Controller

Manages book-related functionalities like adding, updating, retrieving, and deleting books.

- **Fetch Books : get("/getBooks", getBooks);**
- **Fetch book by ID get("/getBookById/:id", getBookById);**
- **Add book to DB: post("/createBook",verifyJwt,hasRole("admin"),uploadFile.single("file"),addBook,);**
- **Update Book : put("/updateBook/:id", verifyJwt, hasRole("admin"), updateBook);**
- **Delete Book : delete("/deleteBook/:id", verifyJwt, hasRole("admin"), deleteBook);**
- **Search Book : get("/searchBook", searchBook);**

---

### Cart Controller

Handles operations related to the user's shopping cart.

- **Add items to cart : post("/addToCart", addToCart);**
- **Delete item from cart : delete("/delete/:id", removeFromCart);**
- **Get Cart items : get("/cartItems", getCartItems);**

---

### Order Controller

Manages order processing, retrieval, and history.

- **place order : post("/add-order", createOrder);**
- **Get orders from user: get("/orders", getUserOrders);**
- **Get order by ID: get("/order/:id", getOrderbyId);**
- **Update Status : patch("/order/:id", hasRole("admin"), updateOrderStatus);**
- **Delere / Cancel order :delete("/order/:id", deleteOrder);**

---

### Category Controller

- **Fetch categories : get("/categories", getCategories);**
- **Add categories post("/add-category", addCategories);**
- **Delete category : delete("/delete-category/:id", deleteCategories);**

### Address Controller

- **add address : post("/", addAddress);**
- **delete address: delete("/:id", deleteAddress);**
- **update user address : put("/:id", updateAddress);**

## Middleware

Add custom middleware in the src/middleware directory for handling authentication, validation, etc.

## Utilities

The src/utils directory contains utility functions and constants used across the application.

Running the Server
To start the server, run:

```sh
npm start
```
