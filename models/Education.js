import mongoose from "mongoose"

const educationSchema = new mongoose.Schema({
  title: { type: String, required: true },
  college: { type: String, required: true },
  description: { type: String },
  session: { type: String },
  percentage: { type: String }
}, { timestamps: true })

export default mongoose.model("Education", educationSchema)