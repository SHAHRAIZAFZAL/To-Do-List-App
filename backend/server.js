import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js"; 
import authRoutes from "./routes/auth.route.js";
import todoRoutes from "./routes/todo.route.js";
import dotenv from "dotenv";
const app = express();

app.use(cors());
app.use(express.json());

dotenv.config();

const PORT = process.env.PORT || 5000;


app.use("/api/auth", authRoutes);
app.use("/api/todo", todoRoutes);

app.listen(PORT, () => {
  connectDB()
  console.log("Server started on http://localhost:"+  PORT);
});
