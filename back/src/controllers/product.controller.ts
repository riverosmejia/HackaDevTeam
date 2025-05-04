import { Request, Response } from "express";
import { createProduct, getAllProducts } from "../services/product.service";

export const registerProduct = (req: Request, res: Response) => {
  const all = getAllProducts();
  res.json(all);
};

export const getProducts = (req: Request, res: Response) => {
  const all = getAllProducts();
  res.json(all);
};
