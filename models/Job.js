const mongoose = require("mongoose");
const JobSchema = new mongoose.Schema(
  {
    position: {
      type: String,
      required: [true, "Please provide position"],
      minLength: 3,
      maxLength: 50,
      trim: true,
    },
    company: {
      type: String,
      required: [true, "Please provide company"],
      minLength: 3,
      maxLength: 50,
      trim: true,
    },
    status: {
      type: String,
      default: "pending",
      enum: ["interview", "declined", "pending"],
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user..."],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Job", JobSchema);
