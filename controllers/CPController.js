const CP = require("../Models/CP");
const fs = require("fs")
exports.getAll = async (req, res) => {
  try {
    const cp = await CP.find();
    res.json(cp);
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
    const createdCP = await CP.create({
      name,
      videos: videosPaths,
    });

    res.json({ message: "Đã Thêm", createdCP });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
exports.delete = async (req, res) => {
  const name = req.params.name
  console.log(name)
  const cp = await CP.findOne({ name })
  if (cp) {
    await CP.deleteOne({ name })
    res.json({message: "Đã Xóa"})
  } else {
    res.send("ko co vid")
  }
}