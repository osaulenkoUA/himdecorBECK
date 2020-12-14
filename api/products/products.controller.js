const productsModel = require('./products.model.js');

async function addProduct(req, res, next) {
	try {
		const product = await productsModel.create(req.body);
		return res.status(201).json(product);
	} catch (err) {
		next(err);
	}
}
async function getProducts(req, res, next) {
	try {
		const allProducts = await productsModel.find({});
		return res.status(200).json(allProducts);
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
module.exports = { addProduct, getProducts };
