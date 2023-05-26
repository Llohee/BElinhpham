const mongoose = require("mongoose");

const Video2Schema = new mongoose.Schema(
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

module.exports = Video2 = mongoose.model("Video2", Video2Schema);
