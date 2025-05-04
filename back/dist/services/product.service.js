"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductidadress = exports.getAllProducts = exports.createProduct = void 0;
const products = [];
// Servicio que "crea" el producto (puedes integrar esto con tu base de datos)
const createProduct = (name, category, description, location) => {
    const newProduct = {
        name,
        category,
        description,
        location,
    };
    products.push(newProduct); // 👉 Se agrega a la lista
    return newProduct;
};
exports.createProduct = createProduct;
const getAllProducts = () => products;
exports.getAllProducts = getAllProducts;
const getProductidadress = (a, b) => {
    const proto = {
        a,
        b,
    };
    return proto;
};
exports.getProductidadress = getProductidadress;
