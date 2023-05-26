const express = require("express");
const video1Controller = require("../controllers/video1Controller");
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

const video1Routes = express.Router();

video1Routes.get("/all", video1Controller.getAll);

video1Routes.post(
  "/create",
  upload.fields([
    {
      name: "videos",
      maxCount: 1,
    },
  ]),
  video1Controller.create
);

video1Routes.delete("/delete/:name", video1Controller.delete);

module.exports = video1Routes;

