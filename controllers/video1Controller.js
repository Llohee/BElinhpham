const Video1 = require("../Models/Video1");
const fs = require("fs")
exports.getAll = async (req, res) => {
  try {
    const video1 = await Video1.find();
    res.json(video1);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
exports.create = async (req, res) => {
  const { name } = req.body;
  let videosPaths = [];
  if (Array.isArray(req.files.videos) && req.files.videos.length > 0) {
    for (let video of req.files.videos) {
      videosPaths.push("/" + video.path);
    }
  }
  try {
    const createdVideo1 = await Video1.create({
      name,
      videos: videosPaths,
    });

    res.json({ message: "Đã thêm", createdVideo1 });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
exports.delete = async (req, res) => {
  const name = req.params.name
  console.log(name)
  const video1 = await Video1.findOne({ name })
  if (video1) {
    await Video1.deleteOne({ name })
    res.json({ message: "Đã xóa" });
  } else {
    res.send("ko co vid")
  }
}