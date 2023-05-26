const New2 = require("../Models/New2");
const fs = require("fs")
exports.getAll = async (req, res) => {
  try {
    const new2 = await New2.find();
    res.json(new2);
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
    const createdNew2 = await New2.create({
      name,
      videos: videosPaths,
    });

    res.json({ message: "Đã Thêm", createdNew2 });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
exports.delete = async (req, res) => {
  const name = req.params.name
  console.log(name)
  const new2 = await New2.findOne({ name })
  if (new2) {
    await New2.deleteOne({ name })
    res.json({message: "Đã Xóa"})
  } else {
    res.send("ko co vid")
  }
}