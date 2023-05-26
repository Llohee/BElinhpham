const mongoose = require("mongoose");

const Video3Schema = new mongoose.Schema(
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

module.exports = Video3 = mongoose.model("Video3", Video3Schema);
