"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.encryptId = encryptId;
exports.decryptId = decryptId;
const crypto_1 = __importDefault(require("crypto"));
// Usamos la clave secreta que configuraste en el archivo `.env`
const SECRET_KEY = process.env.CRYPTO_SECRET_KEY || "12345678901234567890123456789012"; // Asegúrate de que sea de 32 bytes
const IV_LENGTH = 16; // AES requiere un IV de 16 bytes
// Función para encriptar el ID
function encryptId(id) {
    const iv = crypto_1.default.randomBytes(IV_LENGTH); // Generamos un IV aleatorio
    const cipher = crypto_1.default.createCipheriv("aes-256-cbc", Buffer.from(SECRET_KEY), iv); // Usamos AES-256-CBC
    let encrypted = cipher.update(id, "utf8", "hex");
    encrypted += cipher.final("hex"); // Encriptamos el ID
    return iv.toString("hex") + ":" + encrypted; // Devolvemos el IV + el texto encriptado
}
// Función para desencriptar el ID
function decryptId(encryptedId) {
    const [ivHex, encryptedData] = encryptedId.split(":"); // Separamos el IV del texto encriptado
    const iv = Buffer.from(ivHex, "hex"); // Convertimos el IV de hex a buffer
    const decipher = crypto_1.default.createDecipheriv("aes-256-cbc", Buffer.from(SECRET_KEY), iv); // Creamos el descifrador
    let decrypted = decipher.update(encryptedData, "hex", "utf8");
    decrypted += decipher.final("utf8"); // Desencriptamos
    return decrypted; // Devolvemos el ID original
}
