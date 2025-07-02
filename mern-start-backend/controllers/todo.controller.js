import express from "express";
import mongoose from "mongoose";
import Todo from "../models/todo.model.js"; 


export const getTodos =  async (req, res) => {
  try {
    const todos = await Todo.find({ userId: req.user.userId }).sort({ createdAt: -1 });
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ message: "Error fetching todos", error });
  }
}

export const addTodo = async (req, res) => {
  const { text, dueDate } = req.body; 
  if (!text || !text.trim()) {
    return res.status(400).json({ message: "Text is required" });
  }
  try {
    const newTodo = new Todo({
      text,
      dueDate,
      userId: req.user.userId, 
    });

    const saved = await newTodo.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ message: "Error adding todo", error });
  }
}

export const updateTodo = async (req, res) => {
  const { text, completed } = req.body;

  try {
    const todo = await Todo.findOne({ _id: req.params.id, userId: req.user.userId });
    if (!todo) return res.status(404).json({ message: "Todo not found" });

    if (text !== undefined) todo.text = text;
    if (completed !== undefined) todo.completed = completed;

    const updated = await todo.save();
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: "Error updating todo", error });
  }
}

export const deleteTodo = async (req, res) => {
  try {
    const deleted = await Todo.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.userId,
    });
    if (!deleted) return res.status(404).json({ message: "Todo not found" });

    res.status(200).json({ message: "Todo deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting todo", error });
  }
}