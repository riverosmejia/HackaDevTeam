import { Router } from "express";
import {
  registerProduct,
  getProducts,
} from "../controllers/product.controller";

const router = Router();

// Ruta para registrar un producto (POST)
router.post("/products/register", registerProduct);

// Ruta para obtener productos (GET)
router.get("/products/get", getProducts);

export default router;
