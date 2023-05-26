const Video3 = require("../Models/Video3");
const fs = require("fs")
exports.getAll = async (req, res) => {
  try {
    const video3 = await Video3.find();
    res.json(video3);
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
    const createdVideo3 = await Video3.create({
      name,
      videos: videosPaths,
    });

    res.json({ message: "Đã thêm", createdVideo3 });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
exports.delete = async (req, res) => {
  const name = req.params.name
  console.log(name)
  const video3 = await Video3.findOne({ name })
  if (video3) {
    await Video3.deleteOne({ name })
    res.json({ message: "Đã xóa" });
  } else {
    res.send("ko co vid")
  }
}