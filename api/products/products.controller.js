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

module.exports = { addProduct, getProducts };
