const express = require("express");
const video5Controller = require("../controllers/video5Controller");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (!fs.existsSync("public")) {
      fs.mkdirSync("public");
    }

    if (!fs.existsSync("public/videos")) {
      fs.mkdirSync("public/videos");
    }

    cb(null, "public/videos");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    var ext = path.extname(file.originalname);

    if (ext !== ".mkv" && ext !== ".mp4") {
      return cb(new Error("Only videos are allowed!"));
    }

    cb(null, true);
  },
});

const video5Routes = express.Router();

video5Routes.get("/all", video5Controller.getAll);

video5Routes.post(
  "/create",
  upload.fields([
    {
      name: "videos",
      maxCount: 1,
    },
  ]),
  video5Controller.create
);

video5Routes.delete("/delete/:name", video5Controller.delete);

module.exports = video5Routes;

