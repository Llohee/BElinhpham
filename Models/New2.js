const mongoose = require("mongoose");

const New2Schema = new mongoose.Schema(
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

module.exports = New2 = mongoose.model("New2", New2Schema);
