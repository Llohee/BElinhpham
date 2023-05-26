const mongoose = require("mongoose");

const Video1Schema = new mongoose.Schema(
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

module.exports = Video1 = mongoose.model("Video1", Video1Schema);
