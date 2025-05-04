"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllProducts = exports.createProduct = void 0;
const products = [];
// Servicio que "crea" el producto (puedes integrar esto con tu base de datos)
const createProduct = (name, type, description, location) => {
    const newProduct = {
        id: Math.random().toString(36).substr(2, 9),
        name,
        type,
        description,
        location,
    };
    products.push(newProduct); // 👉 Se agrega a la lista
    return newProduct;
};
exports.createProduct = createProduct;
const getAllProducts = () => products;
exports.getAllProducts = getAllProducts;
