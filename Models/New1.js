const mongoose = require("mongoose");

const New1Schema = new mongoose.Schema(
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

module.exports = New1 = mongoose.model("New1", New1Schema);
