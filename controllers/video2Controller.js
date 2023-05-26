const Video2 = require("../Models/Video2");
const fs = require("fs")
exports.getAll = async (req, res) => {
  try {
    const video2 = await Video2.find();
    res.json(video2);
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
    const createdVideo2 = await Video2.create({
      name,
      videos: videosPaths,
    });

    res.json({ message: "Đã thêm", createdVideo2 });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
exports.delete = async (req, res) => {
  const name = req.params.name
  console.log(name)
  const video2 = await Video2.findOne({ name })
  if (video2) {
    await Video2.deleteOne({ name })
    res.json({ message: "Đã xóa" });
  } else {
    res.send("ko co vid")
  }
}