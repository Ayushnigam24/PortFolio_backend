import mongoose from "mongoose"

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  liveLink: { type: String },
  githubLink: { type: String },
  techStack: [String]
}, { timestamps: true })

export default mongoose.model("Project", projectSchema)