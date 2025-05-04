import { prototype } from "events";

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

const products: Product[] = [];

// Servicio que "crea" el producto (puedes integrar esto con tu base de datos)
export const createProduct = (
  name: string,
  category: string,
  description: string,
  location: string
): Product => {
  const newProduct: Product = {
    name,
    category,
    description,
    location,
  };

  products.push(newProduct); // 👉 Se agrega a la lista

  return newProduct;
};

export const getAllProducts = (): Product[] => products;

export const getProductidadress = (a: number, b: number) => {
  const proto: prototype = {
    a,
    b,
  };

  return proto;
};
