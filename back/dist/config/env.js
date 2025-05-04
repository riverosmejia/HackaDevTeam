"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ENV = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.ENV = {
    CONTRACT_ADRESS: process.env.CONTRACT_ADRESS || "",
    PORT: process.env.PORT || 3000,
    CRYPTO_SECRET_KEY: process.env.CRYPTO_SECRET_KEY || "",
};
