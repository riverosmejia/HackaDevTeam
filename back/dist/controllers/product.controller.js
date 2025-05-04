"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProducts = exports.registerProduct = void 0;
const product_service_1 = require("../services/product.service");
const registerProduct = (req, res) => {
    const all = (0, product_service_1.getAllProducts)();
    res.json(all);
};
exports.registerProduct = registerProduct;
const getProducts = (req, res) => {
    const all = (0, product_service_1.getAllProducts)();
    res.json(all);
};
exports.getProducts = getProducts;
