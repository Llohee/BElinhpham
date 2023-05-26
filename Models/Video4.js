const mongoose = require("mongoose");

const Video4Schema = new mongoose.Schema(
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

module.exports = Video4 = mongoose.model("Video4", Video4Schema);
