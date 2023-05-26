const express = require("express");
const video2Controller = require("../controllers/video2Controller");
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

const video2Routes = express.Router();

video2Routes.get("/all", video2Controller.getAll);

video2Routes.post(
  "/create",
  upload.fields([
    {
      name: "videos",
      maxCount: 1,
    },
  ]),
  video2Controller.create
);

video2Routes.delete("/delete/:name", video2Controller.delete);

module.exports = video2Routes;

