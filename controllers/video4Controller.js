const Video4 = require("../Models/Video4");
const fs = require("fs")
exports.getAll = async (req, res) => {
  try {
    const video4 = await Video4.find();
    res.json(video4);
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
    const createdVideo4 = await Video4.create({
      name,
      videos: videosPaths,
    });

    res.json({ message: "Đã thêm", createdVideo4 });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
exports.delete = async (req, res) => {
  const name = req.params.name
  console.log(name)
  const video4 = await Video4.findOne({ name })
  if (video4) {
    await Video4.deleteOne({ name })
    res.json({ message: "Đã xóa" });
  } else {
    res.send("ko co vid")
  }
}