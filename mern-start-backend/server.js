import express from "express";
import mongoose from "mongoose"; 
import cors from "cors";
// const mongoose = require("mongoose");
// const cors = require("cors");

// const authRoutes = require("./routes/auth");
// const todoRoutes = require("./routes/todos");
import authRoutes from "./routes/auth.js";
import todoRoutes from "./routes/todos.js";
const app = express();

app.use(cors());
app.use(express.json());

// ✅ MongoDB connection
mongoose.connect("mongodb://localhost:27017/mern-todo", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api/todos", todoRoutes);

app.listen(5000, () => {
  console.log("Server started on http://localhost:5000");
});
