Restaurant-Management-Backend

This is a **Restaurant Management Backend** built using **Node.js**, **Express**, and **MongoDB**.  
It allows users to manage restaurants, foods, categories, and orders with authentication and role-based access control.

---

## 📂 Project Structure

config
controller
├─ auth-controller.js
├─ category-controller.js
├─ food-controller.js
├─ restaurant-controller.js
├─ test-controller.js
└─ user-controller.js
middleware
├─ admin-middleware.js
└─ auth-middleware.js
models
├─ category-model.js
├─ food-model.js
├─ order-model.js
├─ restaurant-model.js
└─ user-model.js
routers
├─ auth-route.js
├─ category-routes.js
├─ food-route.js
├─ restaurant-route.js
├─ test-route.js
└─ user-route.js
config.env
package.json
package-lock.json
server.js
node_modules/



---

## ⚙️ Features

- **User Authentication:** Register, login, and JWT-based authentication.
- **Role-Based Access:** Admin and client roles with middleware protection.
- **Restaurant Management:** Add, update, delete, and fetch restaurants.
- **Food Management:** Add, update, delete, and fetch food items by restaurant.
- **Category Management:** Add and list food categories.
- **Order Management:** Place orders, track status (`preparing`, `on the way`, `delivered`).
- **Middleware:** Authentication and admin authorization.
- **Test Routes:** For testing APIs during development.

---

## 💻 Technologies Used

- Node.js
- Express.js
- MongoDB & Mongoose
- JWT (JSON Web Tokens)
- bcrypt (for password hashing)
- Nodemon (for development)
- dotenv (environment variables)

---

## 🚀 Getting Started

### 1. Clone the repository

git clone https://github.com/naveenkarri777/-Restaurant-Management-Backend.git
cd Restaurant-Management-Backend

2. Install dependencies
   npm install

3. Configure environment variables
Create a config.env file in the root folder:
 PORT=3000
 MONGO_URI=your_mongodb_connection_string
 JWT_SECRET=your_jwt_secret_key

4. Run the server

npm run dev
Server should start at http://localhost:3000.

📌 API Routes
Auth Routes
/api/v1/auth/register → Register a new user

/api/v1/auth/login → Login

User Routes
/api/v1/user/ → Get user info

/api/v1/user/update → Update user

Restaurant Routes
/api/v1/restaurant/ → Get all restaurants

/api/v1/restaurant/:id → Get single restaurant

Food Routes
/api/v1/food/ → Get all foods

/api/v1/food/:id → Get single food

/api/v1/food/placeorder → Place order (protected route)

Category Routes
/api/v1/category/ → Get all categories

/api/v1/category/add → Add category (admin only)

🔑 Notes
Protected routes require JWT token in headers (Authorization: Bearer <token>).

Admin-only routes require admin role.

📄 License
This project is licensed under the MIT License.

