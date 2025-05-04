// src/routes/product.route.ts
import { Router } from "express";
import {
  registerProduct,
  getProducts,
} from "../controllers/product.controller";

const router = Router();

router.post("/products/register", registerProduct);
router.get("/products/get", getProducts);

export default router;
