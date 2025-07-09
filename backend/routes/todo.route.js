const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/auth");
const { getTodos, addTodo, updateTodo, deleteTodo } = require("../controllers/todo.controller");

router.get("/", verifyToken, getTodos);
router.post("/add", verifyToken, addTodo);
router.put("/:id", verifyToken, updateTodo);
router.delete("/:id", verifyToken, deleteTodo);

module.exports = router;
