import express from "express"
import Education from "../models/Education.js"

const router = express.Router()

// GET all education
router.get("/", async (req, res) => {
  try {
    const education = await Education.find().sort({ createdAt: -1 })
    res.json(education)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// GET single education
router.get("/:id", async (req, res) => {
  try {
    const edu = await Education.findById(req.params.id)
    if (!edu) return res.status(404).json({ message: "Education not found" })
    res.json(edu)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// POST add education
router.post("/", async (req, res) => {
  try {
    const { title, college, description, session, percentage } = req.body
    if (!title || !college) return res.status(400).json({ message: "Title and College are required" })

    const edu = await Education.create({ title, college, description, session, percentage })
    res.status(201).json(edu)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// PUT update education
router.put("/:id", async (req, res) => {
  try {
    const edu = await Education.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!edu) return res.status(404).json({ message: "Education not found" })
    res.json(edu)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// DELETE education
router.delete("/:id", async (req, res) => {
  try {
    const edu = await Education.findByIdAndDelete(req.params.id)
    if (!edu) return res.status(404).json({ message: "Education not found" })
    res.json({ message: "Education deleted successfully" })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

export default router