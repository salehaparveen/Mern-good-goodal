require("dotenv").config();

// imports
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const productRoutes = require("./routes/productRoutes");
const adminRoutes = require("./routes/adminRoutes");
const customerRoutes = require("./routes/customerRoutes");

// store it in app const
const app = express();

// middleware
// it parses incoming request bodies in the JSON format and makes the parsed data available in the req.body property of the request object.
app.use(express.json({ limit: "50mb" }));
app.use(cors());

// routes
app.use("/api/products", productRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/customer", customerRoutes);

// connect to db
mongoose
  .connect(process.env.MONG_URI)
  .then(() => {
    // app.listen will only run after we succesfully connected to the db
    // to run this on terminal -> nodemon server.js
    app.listen(process.env.PORT, () => {
      console.log("database connected & port is running!", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
