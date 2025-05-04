import QRCode from "qrcode";
import { encryptId, decryptId } from "./cripto.service";

interface Product {
  name: string;
  category: string;
  description: string;
  location: string;
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
  location: string
) => {
  const newProduct: Product = {
    name,
    category,
    description,
    location,
  };

  //aquí debemos llamar a Soldility con Avalanche

  let idcript = encryptId("1"); //por ejemplo mientras
  return new Promise((resolve, reject) => {
    QRCode.toDataURL(idcript, (err, url) => {
      if (err) {
        reject({ message: "Error generando el QR", error: err });
      }
      // Respondemos con el producto y el QR generado
      resolve({ qrCode: "http://localhost:5173/read/" + url });
    });
  });

  products.push(newProduct); // 👉 Se agrega a la lista

  return newProduct;
};

export const getAllProducts = (): Product[] => products;

export const getProductidadress = (id: string) => {
  const proto = decryptId(id);

  return proto;
};
