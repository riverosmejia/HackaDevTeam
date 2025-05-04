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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProduct = exports.getProducts = exports.registerProduct = void 0;
const viem_1 = require("viem");
const accounts_1 = require("viem/accounts");
const chains_1 = require("viem/chains");
const env_1 = require("../config/env");
const product_service_1 = require("../services/product.service");
const rpcUrl = "https://api.avax-test.network/ext/bc/C/rpc";
const abi = (0, viem_1.parseAbi)([
    "function storeData(string _name, string _category, string _description, string _location) returns (uint32)",
    "function getData(uint32 id) view returns (string, string, string, string)",
]);
const prkey = "0x831d80f73bf993bf3fca0ff3c07f0a67241cd30b88f34d2b90fbddff2d970b6e";
const account = (0, accounts_1.privateKeyToAccount)(prkey);
const publicClient = (0, viem_1.createPublicClient)({
    chain: chains_1.avalancheFuji,
    transport: (0, viem_1.http)(rpcUrl),
});
const walletClient = (0, viem_1.createWalletClient)({
    account,
    chain: chains_1.avalancheFuji,
    transport: (0, viem_1.http)(rpcUrl),
});
const registerProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, category, description, location } = req.body;
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
        const data = (0, viem_1.encodeFunctionData)({
            abi,
            functionName: "storeData",
            args: [name, category, description, location],
        });
        const gasEstimate = yield publicClient.estimateGas({
            account: account.address,
            to: env_1.ENV.CONTRACT_ADRESS,
            data,
        });
        const hash = yield walletClient.sendTransaction({
            to: env_1.ENV.CONTRACT_ADRESS,
            data,
            gas: gasEstimate,
        });
        const qr = yield (0, product_service_1.createProduct)(name, category, description, location, hash);
        console.log("Producto registrado en la blockchain, hash:", hash);
        res.status(201).json({
            qr: qr,
        });
    }
    catch (err) {
        console.error("Error al registrar el producto:", err);
        res.status(500).json({
            message: "Error al registrar el producto en la blockchain",
            error: err,
        });
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
        res.status(400).json({ error: "id must be a string" });
    }
    const result = (0, product_service_1.getProductidadress)(id);
    res.json({ result });
};
exports.getProduct = getProduct;
