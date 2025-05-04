import { Request, Response } from "express";
import Web3 from "web3";
import {
  createProduct,
  getAllProducts,
  getProductidadress,
} from "../services/product.service";

// Tu URL RPC de Avalanche
const rpcUrl =
  "http://127.0.0.1:38467/ext/bc/26PKhqDYM8ZUUJVsP9WPxmvp4hBueukjiVaZJdm7tcbqkcosFf/rpc";
const web3 = new Web3(rpcUrl);

web3.eth
  .getBlockNumber()
  .then((block) => console.log("Último bloque en Avalanche:", block))
  .catch((err) => console.error("Error de conexión:", err));

export const registerProduct = async (req: Request, res: Response) => {
  // Recibimos los datos en formato JSON
  const { name, category, description, location } = req.body;

  // Verificamos que los datos sean correctos
  if (
    !name ||
    !category ||
    !description ||
    !location ||
    typeof location !== "string"
  ) {
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

    const result = await createProduct(name, category, description, location);

    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ message: "Error al crear el producto", error: err });
  }
};
export const getProducts = (req: Request, res: Response) => {
  const all = getAllProducts();
  res.json(all);
};

export const getProduct = (req: Request, res: Response) => {
  const { id } = req.body;

  if (typeof id !== "string") {
    res.status(400).json({ error: "Both a and b must be strings" });
  }

  const result = getProductidadress(id);

  res.json({ result });
};
