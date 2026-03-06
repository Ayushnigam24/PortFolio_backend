import express from "express"
import Project from "../models/Project.js"

const router = express.Router()

// GET all projects
router.get("/", async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 })
    res.json(projects)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// GET single project
router.get("/:id", async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)
    if (!project) return res.status(404).json({ message: "Project not found" })
    res.json(project)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// POST create new project
router.post("/", async (req, res) => {
  try {
    const { title, description, image, liveLink, githubLink, techStack } = req.body
    if (!title || !description || !image) {
      return res.status(400).json({ message: "Title, description and image are required" })
    }
    const project = await Project.create({ title, description, image, liveLink, githubLink, techStack })
    res.status(201).json(project)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// PUT update project
router.put("/:id", async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!project) return res.status(404).json({ message: "Project not found" })
    res.json(project)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// DELETE project
router.delete("/:id", async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id)
    if (!project) return res.status(404).json({ message: "Project not found" })
    res.json({ message: "Project deleted successfully" })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

export default router