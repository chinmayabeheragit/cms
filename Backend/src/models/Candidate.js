const mongoose = require("mongoose");

const CandidateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  mobileNumber: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  profilePicture: {
    type: String, // Stores the S3 URL for the profile picture
  },
  resume: {
    type: String, // Stores the S3 URL for the resume
  },
  role: {
    type: String,
    enum: ["candidate"],
    default: "candidate",
  },
  createdBy: { type: String, required: true },
}, { timestamps: true });

const candidate = mongoose.model("Candidate", CandidateSchema);
module.exports = { candidate };
