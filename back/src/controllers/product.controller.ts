import { Request, Response } from "express";
import { createProduct, getAllProducts } from "../services/product.service";
import QRCode from "qrcode"; // Importamos la librería para generar el QR

export const registerProduct = (req: Request, res: Response) => {
  // Recibimos los datos en formato JSON
  const { name, type, description, location } = req.body;

  // Verificamos que los datos sean correctos
  if (
    !name ||
    !type ||
    !description ||
    !location ||
    typeof location !== "string"
  ) {
    res
      .status(400)
      .json({ message: "Nombre, tipo, descripción y ubicación requeridos." });
  }

  // Imprimimos la información recibida en la consola
  console.log("Producto recibido:", { name, type, description, location });

  // Creamos el producto (esto puede ser cualquier lógica que tengas en tu servicio)
  const product = createProduct(name, type, description, location);

  // Creamos la cadena con los datos del producto para generar el QR
  const productData = `Nombre: ${name}\nTipo: ${type}\nDescripción: ${description}\nUbicación: ${location}`;

  // Generamos el código QR con los datos del producto
  QRCode.toDataURL(productData, (err, url) => {
    if (err) {
      res.status(500).json({ message: "Error generando el QR", error: err });
    }

    // Respondemos con el producto creado y el código QR generado
    res.status(201).json({ product, qrCode: url });
  });
};
export const getProducts = (req: Request, res: Response) => {
  const all = getAllProducts();
  res.json(all);
};
