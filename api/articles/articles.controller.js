const jwt = require('jsonwebtoken');
const { UnauthorizedError } = require('../helpers/error.js');
const articleModel = require('./articles.model.js');
const { ObjectId } = require('mongodb');

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

// async function authorize(req, res, next) {
//   try {
//     const authorizationHeader = req.get('Authorization') || '';
//     const token = authorizationHeader.replace('Bearer ', '');
//     let userId;

//     try {
//       userId = await jwt.verify(token, process.env.JWT_SECRET).id;
//     } catch (err) {
//       next(new UnauthorizedError('User not authorized'));
//     }

//     req.userId = userId;

//     next();
//   } catch (err) {
//     next(err);
//   }
// }
// async function deleteContact(req, res, next) {
//   try {
//     const contactId = req.params.id;
//     const contact = await financeModel.findByIdAndDelete({ _id: contactId });
//     !contact ? res.status(404).send() : res.status(200).json();
//   } catch (err) {
//     next();
//   }
// }

// function validateId(req, res, next) {
//   const { id } = req.params;

//   if (!ObjectId.isValid(id)) {
//     return res.status(400).send();
//   }

//   next();
// }
module.exports = {addArticle,getArtictes};
