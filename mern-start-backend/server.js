import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js"; 
import authRoutes from "./routes/auth.route.js";
import todoRoutes from "./routes/todo.route.js";

const app = express();

app.use(cors());
app.use(express.json());


app.use("/api/auth", authRoutes);
app.use("/api/todo", todoRoutes);

app.listen(5000, () => {
  connectDB()
  console.log("Server started on http://localhost:5000");
});
