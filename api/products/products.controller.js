const productsModel = require('./products.model.js');
const {ObjectId} = require('mongodb');

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
    try {
        const productId = req.params.id;
        const product = await productsModel.findOne({_id: productId});
        !product ? res.status(404).send() : res.status(200).json(product);
    } catch (err) {
        next(err);
    }
}

async function updateItem(req, res, next) {
    try {
        await productsModel.updateFields(req.body)
        const updatedItem = await productsModel.findById(req.body._id)
        return res.status(202).json({data: updatedItem, success: true});
    } catch (err) {
        next(err);
    }
}


async function deleteItem(req, res, next) {
    try {
        const contactId = req.params.id;
        const contact = await productsModel.findByIdAndDelete({ _id: contactId });
        !contact ? res.status(404).send() : res.status(200).json({message:`product with ${contactId} was deleted`,isSuccessful:true});
    } catch (err) {
        next();
    }
}

function validateId(req, res, next) {
    const {id} = req.params;

    if (!ObjectId.isValid(id)) {
        return res.status(400).send();
    }

    next();
}

module.exports = {addProduct, getProducts, getProductById, validateId, updateItem,deleteItem};
