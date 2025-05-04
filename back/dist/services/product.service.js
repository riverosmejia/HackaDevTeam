"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllProducts = exports.createProduct = void 0;
const products = [];
const createProduct = (name, price) => {
    const newProduct = { name, price };
    products.push(newProduct);
    return newProduct;
};
exports.createProduct = createProduct;
const getAllProducts = () => products;
exports.getAllProducts = getAllProducts;
