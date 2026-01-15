import { Todo } from "../models/todo.model.js"

export const createTodo = async (req, res) => {
    try {
        const { title } = req.body

        if (!title) {
            return res.status(400).json({
                success: false,
                message: "Title are required"
            })
        }

        const newTodo = await Todo.create({ title })

        return res.status(200).json({
            success: true,
            message: "TODO CREATED SUCCESSFULLY",
            newTodo
        })
    } catch (error) {
        console.log(error, "error")
        return res.status(500).json({
            success: false,
            message: "Something went wront to create TODO"
        })
    }
}

export const getAllTodos = async (req, res) => {
    try {
        const todos = await Todo.find()

        return res.status(200).json({
            success: true,
            message: "ALL TODOS GET SUCCESSFULLY",
            todos
        })
    } catch (error) {
        console.log(error, "error")
        return res.status(500).json({
            success: false,
            message: "Something went wrong to get all todos"
        })
    }
}

export const getSingleTodo = async (req, res) => {

    try {
        const todo = await Todo.findById(req.params.id)

        return res.status(200).json({
            success: true,
            message: "SINGLE TODO GET SUCCESSFULLY",
            todo
        })
    } catch (error) {
        console.log(error, "error")
        return res.status(500).json({
            success: false,
            message: "Something went wrong to get single todo"
        })
    }

}

export const updateTodo = async (req, res) => {
    try {
        const updateTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true })

        return res.status(200).json({
            success: true,
            message: "TODO UPDATED SUCCESSFULLY",
            updateTodo
        })
    } catch (error) {
        console.log(error, "error")
        return res.status(500).json({
            success: false,
            message: "Something went wrong to update todo"
        })
    }
}

export const deleteTodo = async (req, res) => {
    try {
        const deleteTodo = await Todo.findOneAndDelete(req.params.id)

        return res.status(200).json({
            success: true,
            message: "TODO DELETED SUCCESSFULLY",
            deleteTodo
        })
    } catch (error) {
        console.log(error, "error")
        return res.status(500).json({
            success: false,
            message: "Something went wrong to delete todo"
        })
    }
}

