import express from "express"
const router = express.Router()
import User from "../models/User.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

// Register admin (optional)
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body
  try {
    const hashed = await bcrypt.hash(password, 10)
    await User.create({ name, email, password: hashed, role: "admin" })
    res.json({ message: "Admin registered successfully" })
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await User.findOne({ email })
    if (!user) return res.status(400).json({ message: "User not found" })

    const match = await bcrypt.compare(password, user.password)
    if (!match) return res.status(400).json({ message: "Invalid credentials" })

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "7d" })
    res.json({ token, user: { name: user.name, email: user.email, role: user.role } })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

export default router