const New1 = require("../Models/New1");
const fs = require("fs")
exports.getAll = async (req, res) => {
  try {
    const new1 = await New1.find();
    res.json(new1);
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
    const createdNew1 = await New1.create({
      name,
      videos: videosPaths,
    });

    res.json({ message: "Đã Thêm", createdNew1 });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
exports.delete = async (req, res) => {
  const name = req.params.name
  console.log(name)
  const new1 = await New1.findOne({ name })
  if (new1) {
    await New1.deleteOne({ name })
    res.json({message: "Đã Xóa"})
  } else {
    res.send("ko co vid")
  }
}