import express from "express";
import verifyToken from "../middleware/auth.js";
import { getTodos, addTodo, updateTodo, deleteTodo } from "../controllers/todo.controller.js";

const router = express.Router();

router.get("/", verifyToken, getTodos);
router.post("/add", verifyToken, addTodo);
router.put("/:id", verifyToken, updateTodo);
router.delete("/:id", verifyToken, deleteTodo);

export default router;
