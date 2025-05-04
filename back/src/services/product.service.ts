interface Product {
  id: string;
  name: string;
  type: string;
  description: string;
  location: string;
}

const products: Product[] = [];

// Servicio que "crea" el producto (puedes integrar esto con tu base de datos)
export const createProduct = (
  name: string,
  type: string,
  description: string,
  location: string
): Product => {
  const newProduct: Product = {
    id: Math.random().toString(36).substr(2, 9),
    name,
    type,
    description,
    location,
  };

  products.push(newProduct); // 👉 Se agrega a la lista

  return newProduct;
};

export const getAllProducts = (): Product[] => products;
