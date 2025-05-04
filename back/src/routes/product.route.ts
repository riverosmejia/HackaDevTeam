// src/routes/product.route.ts
import { Router } from "express";
import {
  registerProduct,
  getProducts,
  getProduct,
} from "../controllers/product.controller";

const router = Router();

router.post("/products/register", registerProduct);
router.post("/products/getProduct", getProduct);
router.get("/products/get", getProducts);

export default router;
