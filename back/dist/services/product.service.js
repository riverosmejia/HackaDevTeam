"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductidadress = exports.getAllProducts = exports.createProduct = void 0;
const qrcode_1 = __importDefault(require("qrcode"));
const cripto_service_1 = require("./cripto.service");
const Web3 = require("web3");
const products = [];
// Servicio que "crea" el producto (puedes integrar esto con tu base de datos)
const createProduct = (name, category, description, location) => {
    const newProduct = {
        name,
        category,
        description,
        location,
    };
    //aquí debemos llamar a Soldility con Avalanche
    let idcript = (0, cripto_service_1.encryptId)("1"); //por ejemplo mientras
    return new Promise((resolve, reject) => {
        qrcode_1.default.toDataURL(idcript, (err, url) => {
            if (err) {
                reject({ message: "Error generando el QR", error: err });
            }
            // Respondemos con el producto y el QR generado
            resolve({ qrCode: url });
        });
    });
    products.push(newProduct); // 👉 Se agrega a la lista
    return newProduct;
};
exports.createProduct = createProduct;
const getAllProducts = () => products;
exports.getAllProducts = getAllProducts;
const getProductidadress = (id) => {
    const proto = (0, cripto_service_1.decryptId)(id);
    return proto;
};
exports.getProductidadress = getProductidadress;
