const productsModel = require('./products.model.js');
const { ObjectId } = require('mongodb');

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

async function getProductById(req, res, next) {
	try{
		const productId=req.params.id;
		const product=await productsModel.findOne({_id:productId});
		!product?res.status(404).send():res.status(200).json(product);
	}
	catch(err){
		next(err);
	}
}


function validateId(req, res, next) {
	const { id } = req.params;

	if (!ObjectId.isValid(id)) {
		return res.status(400).send();
	}

	next();
}
module.exports = { addProduct, getProducts,getProductById,validateId };
