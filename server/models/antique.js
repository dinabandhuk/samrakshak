const mongoose = require("mongoose");

const antiqueSchema = mongoose.Schema({
  antiqueName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  origin: {
    type: String,
  },
  location: {
    type: [Number],
    required: true,
  },
  glbData: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "uploads.files",
    required: true,
  },
  image: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "uploads.files",
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Antique = mongoose.model("Antique", antiqueSchema);
module.exports = Antique;
