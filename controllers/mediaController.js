const Media = require("../Models/Media");
const fs = require("fs")
exports.getAll = async (req, res) => {
  try {
    const media = await Media.find();
    res.json(media);
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
    const createdMedia = await Media.create({
      name,
      videos: videosPaths,
    });

    res.json({ message: "Đã Thêm", createdMedia });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
exports.delete = async (req, res) => {
  const name = req.params.name
  console.log(name)
  const media = await Media.findOne({ name })
  if (media) {
    await Media.deleteOne({ name })
    res.json({message: "Đã Xóa"})
  } else {
    res.send("ko co vid")
  }
}