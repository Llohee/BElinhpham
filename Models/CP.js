const mongoose = require("mongoose");

const CPSchema = new mongoose.Schema(
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

module.exports = CP = mongoose.model("CP", CPSchema);
