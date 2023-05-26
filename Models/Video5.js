const mongoose = require("mongoose");

const Video5Schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    videos: [{ type: String }],
  },
  {
    timestamps: true,
  }
);

module.exports = Video5 = mongoose.model("Video5", Video5Schema);
