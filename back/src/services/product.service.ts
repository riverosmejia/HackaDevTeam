interface Product {
  name: string;
  price: number;
}

const products: Product[] = [];

export const createProduct = (name: string, price: number): Product => {
  const newProduct: Product = { name, price };
  products.push(newProduct);
  return newProduct;
};

export const getAllProducts = (): Product[] => products;
