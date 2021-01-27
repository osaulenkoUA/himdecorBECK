const galleryModel = require('./gallery.model');

async function addGallery(req, res, next) {
  try {

    const gallery = await galleryModel.create(req.body);
    return res.status(201).json(gallery);
  } catch (err) {
    next(err);
  }
}
async function getGallery(req, res, next) {
  try {
    const allGallery = await galleryModel.find({});
    return res.status(200).json(allGallery);
  } catch (err) {
    next(err);
  }
}


module.exports = {addGallery,getGallery};
