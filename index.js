import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
import projectRoutes from "./routes/projectRoutes.js"
import educationRoutes from "./routes/educationRoutes.js"
import certificationRoutes from "./routes/certificationRoutes.js"
import authRoutes from "./routes/auth.js"
import contactRoutes from "./routes/contactRoutes.js";
import dns from 'dns'
dns.setServers(["1.1.1.1","8.8.8.8"]);


dotenv.config()
const app = express()

app.use(cors())
app.use(express.json())
app.use("/api/projects", projectRoutes)
app.use("/api/education", educationRoutes)
app.use("/api/certifications", certificationRoutes)
app.use("/api/auth", authRoutes)
app.use("/api/contact", contactRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err))

app.listen(5000, () => console.log("Server running on port 5000"))