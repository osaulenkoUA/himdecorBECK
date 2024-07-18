const productsModel = require('./products.model.js');
const {ObjectId} = require('mongodb');

async function addProduct(req, res) {
    try {
        const product = await productsModel.create(req.body);
        return res.status(201).json(product);
    } catch (err) {
        res.status(400).json({data: 'cannot create', isSuccessful: false});
    }
}

async function getProducts(req, res) {
    try {
        const allProducts = await productsModel.find({});
        return res.status(200).json(allProducts);
    } catch (err) {
        res.status(404).json({data: 'not found', isSuccessful: false});

    }
}

async function getProductById(req, res) {
    try {
        const productId = req.query.id;
        const product = await productsModel.findOne({_id: productId});
        !product ? res.status(404).json({data: 'not found', isSuccessful: false}) : res.status(200).json(product);
    } catch (err) {
        res.status(404).json({data: 'not found', isSuccessful: false});

    }
}

async function updateItem(req, res) {
    try {
        await productsModel.updateFields(req.body)
        const updatedItem = await productsModel.findById(req.body._id)
        res.status(202).json({data: updatedItem, isSuccessful: true});
    } catch (err) {
        res.status(400).json({data: null, isSuccessful: false});
    }
}


async function deleteItem(req, res) {
    try {
        const {id} = req?.query;
        const contact = await productsModel.findByIdAndDelete({_id: id});
        !contact ? res.status(404).json({isSuccessful: false}) : res.status(200).json({
            message: `product with ${id} was deleted`, isSuccessful: true
        });
    } catch (err) {
        res.status(404).json({data: null, isSuccessful: false});
    }
}

function validateId(req, res, next) {
    const {id} = req?.query;
    if (!ObjectId.isValid(id)) {
        return res.status(404).send();
    }
    next();
}

module.exports = {addProduct, getProducts, getProductById, validateId, updateItem, deleteItem};
