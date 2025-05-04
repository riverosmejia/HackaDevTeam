"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProduct = exports.getProducts = exports.registerProduct = void 0;
const product_service_1 = require("../services/product.service");
const qrcode_1 = __importDefault(require("qrcode")); // Importamos la librería para generar el QR
const registerProduct = (req, res) => {
    // Recibimos los datos en formato JSON
    const { name, category, description, location } = req.body;
    // Verificamos que los datos sean correctos
    if (!name ||
        !category ||
        !description ||
        !location ||
        typeof location !== "string") {
        res.status(400).json({
            message: "Nombre, categoría, descripción y ubicación requeridos.",
        });
    }
    // Imprimimos la información recibida en la consola
    console.log("Producto recibido:", { name, category, description, location });
    // Creamos el producto (esto puede ser cualquier lógica que tengas en tu servicio)
    const product = (0, product_service_1.createProduct)(name, category, description, location);
    // Creamos la cadena con los datos del producto para generar el QR
    const productData = `Nombre: ${name}\nTipo: ${category}\nDescripción: ${description}\nUbicación: ${location}`;
    // Generamos el código QR con los datos del producto
    qrcode_1.default.toDataURL(productData, (err, url) => {
        if (err) {
            res.status(500).json({ message: "Error generando el QR", error: err });
        }
        // Respondemos con el producto creado y el código QR generado
        res.status(201).json({ qrCode: url });
    });
};
exports.registerProduct = registerProduct;
const getProducts = (req, res) => {
    const all = (0, product_service_1.getAllProducts)();
    res.json(all);
};
exports.getProducts = getProducts;
const getProduct = (req, res) => {
    const { a, b } = req.body;
    if (typeof a !== "number" || typeof b !== "number") {
        res.status(400).json({ error: "Both a and b must be numbers" });
    }
    const result = (0, product_service_1.getProductidadress)(a, b);
    res.json({ result });
};
exports.getProduct = getProduct;
