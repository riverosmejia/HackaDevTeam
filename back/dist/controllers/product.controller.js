"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProduct = exports.getProducts = exports.registerProduct = void 0;
const web3_1 = __importDefault(require("web3"));
const product_service_1 = require("../services/product.service");
// Tu URL RPC de Avalanche
const rpcUrl = "https://scaling-space-goggles-7v7776x5vj4j2x7rw-39719.app.github.dev/ext/bc/2HbaAyQ3bpFiaE35RyChQo6maehMxMFGooTb7rbMeyKFJySsZc/rpc";
const web3 = new web3_1.default(rpcUrl);
web3.eth
    .getBlockNumber()
    .then((block) => console.log("Último bloque en Avalanche:", block))
    .catch((err) => console.error("Error de conexión:", err));
const registerProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
    try {
        // Imprimimos la información recibida en la consola
        console.log("Producto recibido:", {
            name,
            category,
            description,
            location,
        });
        const result = yield (0, product_service_1.createProduct)(name, category, description, location);
        res.status(201).json(result);
    }
    catch (err) {
        res.status(500).json({ message: "Error al crear el producto", error: err });
    }
});
exports.registerProduct = registerProduct;
const getProducts = (req, res) => {
    const all = (0, product_service_1.getAllProducts)();
    res.json(all);
};
exports.getProducts = getProducts;
const getProduct = (req, res) => {
    const { id } = req.body;
    if (typeof id !== "string") {
        res.status(400).json({ error: "Both a and b must be strings" });
    }
    const result = (0, product_service_1.getProductidadress)(id);
    res.json({ result });
};
exports.getProduct = getProduct;
