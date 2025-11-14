import express, { Application } from "express"
import cors from "cors"
import bodyParser from "body-parser"
import routes from "./routes/index"
import { connectDB } from "./config/db"
import authRoutes from "./routes/authRoutes"
// import { errorHandler } from './middlewares/errorHandler';

const app: Application = express()

// Middleware
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Database Connection
connectDB()
app.set("trust proxy", true)

// Routes
app.use("/api", routes)
app.use("/api/auth", authRoutes)

// Error Handling Middleware (if implemented)
// app.use(errorHandler);

export default app
