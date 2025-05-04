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
const createProduct = (name, category, description, location, hash) => {
    const newProduct = {
        name,
        category,
        description,
        location,
        hash,
    };
    products.push(newProduct); // Se agrega a la lista ANTES del return
    // Si aún necesitas encriptar, podrías usar algo como:
    // const idcript = encryptId(JSON.stringify(newProduct));
    const productString = JSON.stringify(newProduct);
    return new Promise((resolve, reject) => {
        qrcode_1.default.toDataURL(productString, (err, url) => {
            if (err) {
                reject({ message: "Error generando el QR", error: err });
            }
            // Respondemos con el producto y el QR generado
            resolve({
                qrImage: url, // esto es el base64 para mostrarlo si lo deseas
            });
        });
    });
};
exports.createProduct = createProduct;
const getAllProducts = () => products;
exports.getAllProducts = getAllProducts;
const getProductidadress = (id) => {
    const proto = (0, cripto_service_1.decryptId)(id);
    return proto;
};
exports.getProductidadress = getProductidadress;
