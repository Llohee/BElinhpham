const express = require("express");
const CPController = require("../controllers/CPController");
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

const CPRoutes = express.Router();

CPRoutes.get("/all", CPController.getAll);

CPRoutes.post(
  "/create",
  upload.fields([
    {
      name: "videos",
      maxCount: 20,
    },
  ]),
  CPController.create
);

CPRoutes.delete("/delete/:name", CPController.delete);

module.exports = CPRoutes;

