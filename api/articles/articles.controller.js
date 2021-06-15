const articleModel = require('./articles.model.js');

async function addArticle(req, res, next) {
  try {

    const article = await articleModel.create(req.body);
    return res.status(201).json(article);
  } catch (err) {
    next(err);
  }
}
async function getArtictes(req, res, next) {
  try {
    const allArticles = await articleModel.find({});
    return res.status(200).json(allArticles);
  } catch (err) {
    next(err);
  }
}


async function getArticteById(req, res, next) {
  try {
    const articleId = req.params.id;
    const article = await articleModel.findOne({ _id: articleId });
    !article ? res.status(404).send() : res.status(200).json(article);
  } catch (err) {
    next(err);
  }
}

module.exports = {addArticle,getArtictes,getArticteById};
