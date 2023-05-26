const express = require("express");
const video3Controller = require("../controllers/video3Controller");
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

const video3Routes = express.Router();

video3Routes.get("/all", video3Controller.getAll);

video3Routes.post(
  "/create",
  upload.fields([
    {
      name: "videos",
      maxCount: 1,
    },
  ]),
  video3Controller.create
);

video3Routes.delete("/delete/:name", video3Controller.delete);

module.exports = video3Routes;

