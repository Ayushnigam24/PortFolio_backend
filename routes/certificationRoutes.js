import express from "express"
import Certification from "../models/Certification.js"

const router = express.Router()

// GET all certifications
router.get("/", async (req, res) => {
  try {
    const certifications = await Certification.find().sort({ createdAt: -1 })
    res.json(certifications)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// POST create certification
router.post("/", async (req, res) => {
  try {
    const { name, issuer, date, credentialId } = req.body
    if (!name || !issuer) return res.status(400).json({ message: "Name and Issuer are required" })

    const cert = await Certification.create({ name, issuer, date, credentialId })
    res.status(201).json(cert)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// PUT update certification
router.put("/:id", async (req, res) => {
  try {
    const cert = await Certification.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!cert) return res.status(404).json({ message: "Certification not found" })
    res.json(cert)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// DELETE certification
router.delete("/:id", async (req, res) => {
  try {
    const cert = await Certification.findByIdAndDelete(req.params.id)
    if (!cert) return res.status(404).json({ message: "Certification not found" })
    res.json({ message: "Certification deleted successfully" })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

export default router