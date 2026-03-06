import express from "express";
import Contact from "../models/Contact.js";
import { isAuth } from "../middleware/auth.js"; // ye admin authentication middleware hai

const router = express.Router();

// POST message from user
router.post("/", async (req, res) => {
  try {
    const { name, email, message, subject } = req.body;
    if (!name || !email || !message)
      return res.status(400).json({ message: "Name, Email and Message are required" });

    const contact = await Contact.create({ name, email, message, subject });
    res.status(201).json(contact);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET all messages (admin only)
router.get("/", isAuth, async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE message (admin only)
router.delete("/:id", isAuth, async (req, res) => {
  try {
    const msg = await Contact.findByIdAndDelete(req.params.id);
    if (!msg) return res.status(404).json({ message: "Message not found" });
    res.json({ message: "Message deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;