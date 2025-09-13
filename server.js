const express = require('express');
const dotenv  = require('dotenv');
const colors  = require('colors');
const testRouter = require('./routers/test-route');
const authRouter = require('./routers/auth-route');
const connectDB  = require('./config/db');
const userroute = require('./routers/user-route');
const restaurantroute = require('./routers/restaurant-route');
const categoryroutes = require('./routers/category-routes');
const foodroute = require('./routers/food-route');

dotenv.config({ path: './config.env' });

connectDB();

const app = express();

//middlewares
app.use(express.json());

// Home route
app.get("/", (req, res) => {
   res.status(200).send("<h1>Welcome to my restaurant - app</h1>");
});

// API routes
app.use("/api/v1/test", testRouter);

//autho route
app.use("/api/v1/auth", authRouter); 

//user route
app.use("/api/v1/user",userroute);

//restaurant route
app.use("/api/v1/restaurant",restaurantroute);

//category route
app.use("/api/v1/category",categoryroutes);

//food route
app.use("/api/v1/food",foodroute);


// Port
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server running on port ${port}`.bgRed);
});
