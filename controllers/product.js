'use strict'
const Product = require('../models/product')

function getProduct(req,res) {
    let productId = req.params.productId;

    Product.findById(productId, (err, product) => {
        if(err) return res.status(500).send({message: `Error al realizar la peticion: ${err}`})
        if(!product) return res.status(404).send({message: `el producto no existe`})
        res.status(200).send({product})
    });
}

function getProducts(req,res) {
    Product.find({}, (err, products) => {
        if(err) return res.status(500).send({message: `Error al realizar la peticion: ${err}`})
        if(!products) return res.status(404).send({message: `No existen productos`})
        res.status(200).send({products})
    })
}

function saveProduct(req,res) {
    let product = new Product();
    product.name = req.body.name;
    product.picture = req.body.picture;
    product.price = req.body.price;
    product.category = req.body.category;
    product.description = req.body.description;

    product.save((err, productStored) => {
        if (err) res.status(500).send({message: `Error al guardar en base de datos: ${err}`})
        res.status(200).send({product: productStored})
    })
}

function updateProduct(req,res) {
    let productId = req.params.productId;
    let update = req.body;

    Product.findByIdAndUpdate(productId, update, (err, productUpdated) => {
        if(err) return res.status(500).send({message: `Error al actualizar el producto: ${err}`})
        res.status(200).send({product: productUpdated})
    })
}

function deleteProduct(req,res) {
    let productId = req.params.productId;

    Product.findById(productId, (err, product) => {
        if(err) return res.status(500).send({message: `Error al borrar el producto: ${err}`})
        if(product) { // if product is null
            product.remove(err => {
                if(err) return res.status(500).send({message: `Error al borrar el producto: ${err}`})
                res.status(200).send({message: `El producto ha sido eliminado`})
            })
        } else {
            return res.status(400).send({message: `Error al borrar el producto: ${err} - El producto ya no existe en la base de datos.`})
        }
    })
}

module.exports = {
    getProduct,
    getProducts,
    saveProduct,
    updateProduct,
    deleteProduct
}
