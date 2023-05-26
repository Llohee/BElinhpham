const Video5 = require("../Models/Video5");
const fs = require("fs")
exports.getAll = async (req, res) => {
  try {
    const video5 = await Video5.find();
    res.json(video5);
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
    const createdVideo5 = await Video5.create({
      name,
      videos: videosPaths,
    });

    res.json({ message: "Đã thêm", createdVideo5 });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
exports.delete = async (req, res) => {
  const name = req.params.name
  console.log(name)
  const video5 = await Video5.findOne({ name })
  if (video5) {
    await Video5.deleteOne({ name })
    res.json({ message: "Đã xóa" });
  } else {
    res.send("ko co vid")
  }
}