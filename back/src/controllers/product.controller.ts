import { Request, Response } from "express";
import {
  createProduct,
  getAllProducts,
  getProductidadress,
} from "../services/product.service";
import QRCode from "qrcode"; // Importamos la librería para generar el QR

export const registerProduct = (req: Request, res: Response) => {
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

  // Imprimimos la información recibida en la consola
  console.log("Producto recibido:", { name, category, description, location });

  // Creamos el producto (esto puede ser cualquier lógica que tengas en tu servicio)
  const product = createProduct(name, category, description, location);

  // Creamos la cadena con los datos del producto para generar el QR
  const productData = `Nombre: ${name}\nTipo: ${category}\nDescripción: ${description}\nUbicación: ${location}`;

  // Generamos el código QR con los datos del producto
  QRCode.toDataURL(productData, (err, url) => {
    if (err) {
      res.status(500).json({ message: "Error generando el QR", error: err });
    }

    // Respondemos con el producto creado y el código QR generado
    res.status(201).json({ qrCode: url });
  });
};
export const getProducts = (req: Request, res: Response) => {
  const all = getAllProducts();
  res.json(all);
};

export const getProduct = (req: Request, res: Response) => {
  const { a, b } = req.body;

  if (typeof a !== "number" || typeof b !== "number") {
    res.status(400).json({ error: "Both a and b must be numbers" });
  }

  const result = getProductidadress(a, b);

  res.json({ result });
};
