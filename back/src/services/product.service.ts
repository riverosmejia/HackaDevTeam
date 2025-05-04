import QRCode from "qrcode";
import { encryptId, decryptId } from "./cripto.service";

interface Product {
  name: string;
  category: string;
  description: string;
  location: string;
  hash: string;
}

interface prototype {
  a: number;
  b: number;
}

const Web3 = require("web3");

const products: Product[] = [];

// Servicio que "crea" el producto (puedes integrar esto con tu base de datos)
export const createProduct = (
  name: string,
  category: string,
  description: string,
  location: string,
  hash: string
) => {
  const newProduct: Product = {
    name,
    category,
    description,
    location,
    hash,
  };

  products.push(newProduct); // Se agrega a la lista ANTES del return

  // Si aún necesitas encriptar, podrías usar algo como:
  // const idcript = encryptId(JSON.stringify(newProduct));
  const productString = JSON.stringify(newProduct);

  return new Promise((resolve, reject) => {
    QRCode.toDataURL(productString, (err, url) => {
      if (err) {
        reject({ message: "Error generando el QR", error: err });
      }
      // Respondemos con el producto y el QR generado
      resolve({
        qrImage: url, // esto es el base64 para mostrarlo si lo deseas
      });
    });
  });
};

export const getAllProducts = (): Product[] => products;

export const getProductidadress = (id: string) => {
  const proto = decryptId(id);

  return proto;
};
