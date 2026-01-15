import express from "express"
import "dotenv/config"
import cors from "cors"
import connectDB from "./config/db.js"
import todoRoute from "./routes/todo.routes.js"

const app = express()

const PORT = process.env.PORT || 9090

app.use(express.json())
app.use(cors({
    origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}))

app.use("/todo", todoRoute)

app.get("/", (req, res) => {
    res.send("HELLO FROM EXPRESS SERVER")
})

app.listen(PORT, () => {
    connectDB()
    console.log(`SERVER IS RUN ON PORT ${PORT}`)
})