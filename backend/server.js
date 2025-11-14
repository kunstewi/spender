require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoute");

const app = express();

// Middleware to Handle CORS
app.use(
  cors({
    origin: process.env.CLIENT_URL || "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Middleware to parse JSON
app.use(express.json());

// MongoDB Connection
connectDB();

// Authentication Route
app.use("/api/v1/auth", authRoutes);

// serve uploads folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Server Start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
