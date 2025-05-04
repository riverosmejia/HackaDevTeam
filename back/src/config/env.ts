import dotenv from "dotenv";

dotenv.config();

export const ENV = {
  CONTRACT_ADRESS: process.env.CONTRACT_ADRESS || "",
  PORT: process.env.PORT || 3000,
  CRYPTO_SECRET_KEY: process.env.CRYPTO_SECRET_KEY || "",
};
