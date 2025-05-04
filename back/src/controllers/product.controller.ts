import { Request, Response } from "express";
import {
  createPublicClient,
  createWalletClient,
  http,
  parseAbi,
  encodeFunctionData,
  hexToBytes,
} from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { avalancheFuji } from "viem/chains";
import { ENV } from "../config/env";
import {
  createProduct,
  getAllProducts,
  getProductidadress,
} from "../services/product.service";

const rpcUrl = "https://api.avax-test.network/ext/bc/C/rpc";

const abi = parseAbi([
  "function storeData(string _name, string _category, string _description, string _location) returns (uint32)",
  "function getData(uint32 id) view returns (string, string, string, string)",
]);

const prkey =
  "0x831d80f73bf993bf3fca0ff3c07f0a67241cd30b88f34d2b90fbddff2d970b6e";

const account = privateKeyToAccount(prkey as `0x${string}`);

const publicClient = createPublicClient({
  chain: avalancheFuji,
  transport: http(rpcUrl),
});

const walletClient = createWalletClient({
  account,
  chain: avalancheFuji,
  transport: http(rpcUrl),
});

export const registerProduct = async (req: Request, res: Response) => {
  const { name, category, description, location } = req.body;

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
    const data = encodeFunctionData({
      abi,
      functionName: "storeData",
      args: [name, category, description, location],
    });

    const gasEstimate = await publicClient.estimateGas({
      account: account.address,
      to: ENV.CONTRACT_ADRESS as `0x${string}`,
      data,
    });

    const hash = await walletClient.sendTransaction({
      to: ENV.CONTRACT_ADRESS as `0x${string}`,
      data,
      gas: gasEstimate,
    });

    const qr = await createProduct(name, category, description, location, hash);

    console.log("Producto registrado en la blockchain, hash:", hash);

    res.status(201).json({
      qr: qr,
    });
  } catch (err) {
    console.error("Error al registrar el producto:", err);
    res.status(500).json({
      message: "Error al registrar el producto en la blockchain",
      error: err,
    });
  }
};

export const getProducts = (req: Request, res: Response) => {
  const all = getAllProducts();
  res.json(all);
};

export const getProduct = (req: Request, res: Response) => {
  const { id } = req.body;

  if (typeof id !== "string") {
    res.status(400).json({ error: "id must be a string" });
  }

  const result = getProductidadress(id);

  res.json({ result });
};
