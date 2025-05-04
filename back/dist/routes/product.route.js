"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/product.route.ts
const express_1 = require("express");
const product_controller_1 = require("../controllers/product.controller");
const router = (0, express_1.Router)();
router.post("/products/register", product_controller_1.registerProduct);
router.post("/products/getProduct", product_controller_1.getProduct);
router.get("/products/get", product_controller_1.getProducts);
exports.default = router;
