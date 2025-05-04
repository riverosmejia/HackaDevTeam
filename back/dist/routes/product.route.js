"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_controller_1 = require("../controllers/product.controller");
const router = (0, express_1.Router)();
// Ruta para registrar un producto (POST)
router.post("/products/register", product_controller_1.registerProduct);
// Ruta para obtener productos (GET)
router.get("/products/get", product_controller_1.getProducts);
exports.default = router;
