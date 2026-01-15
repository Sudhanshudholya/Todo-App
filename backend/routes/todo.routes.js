import express from "express"
import { createTodo, deleteTodo, getAllTodos, getSingleTodo, updateTodo } from "../controllers/todo.controller.js"

const router = express.Router()

router.post("/create-todo", createTodo)
router.get("/get-all-todos", getAllTodos)
router.get("/get-todo-by-id/:id", getSingleTodo)
router.put("/update-todo-by-id/:id", updateTodo)
router.delete("/delete-todo-by-id/:id", deleteTodo)

export default router