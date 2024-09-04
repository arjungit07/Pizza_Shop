const express = require("express");
const morgan = require("morgan");
const cors = require('cors');

// const connectDB = require('./config/config')
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const connectDB = require("./config/config");
const data = require("./data/pizza-data");
require("colors");

//config
dotenv.config();



//conection
//
connectDB();
const app = express();

//middlewares;
app.use(morgan("dev"));

app.use(cors({
  origin: ['https://online-pizza-delivery-app.vercel.app', 'http://localhost:3000'],  // Allow both Vercel and local development
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify the allowed HTTP methods
  credentials: true, // Include credentials if needed (e.g., cookies or authentication headers)
}));

app.use(function (req, res, next) {	
    res.setHeader('Access-Control-Allow-Origin', 'https://online-pizza-delivery-app.vercel.app',);    
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');    
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');   
    res.setHeader('Access-Control-Allow-Credentials', true);    
    next();
});

//route
app.use("/api/pizza", require("./router/pizzaRouter"));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use("/api/users", require("./router/userRouter"));
app.use("/api/orders", require("./router/orderRouter"));
app.get("/", (req, res) => {
  res.send("<h1>Hello World</h1>");
});
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(
    `Server running on ${process.env.NODE_ENV}mode on port no.${process.env.PORT}`
      .bgRed.white
  );
});
