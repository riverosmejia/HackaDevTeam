import crypto from "crypto";

// Usamos la clave secreta que configuraste en el archivo `.env`
const SECRET_KEY =
  process.env.CRYPTO_SECRET_KEY || "12345678901234567890123456789012"; // Asegúrate de que sea de 32 bytes
const IV_LENGTH = 16; // AES requiere un IV de 16 bytes

// Función para encriptar el ID
export function encryptId(id: string): string {
  const iv = crypto.randomBytes(IV_LENGTH); // Generamos un IV aleatorio
  const cipher = crypto.createCipheriv(
    "aes-256-cbc",
    Buffer.from(SECRET_KEY),
    iv
  ); // Usamos AES-256-CBC
  let encrypted = cipher.update(id, "utf8", "hex");
  encrypted += cipher.final("hex"); // Encriptamos el ID
  return iv.toString("hex") + ":" + encrypted; // Devolvemos el IV + el texto encriptado
}

// Función para desencriptar el ID
export function decryptId(encryptedId: string): string {
  const [ivHex, encryptedData] = encryptedId.split(":"); // Separamos el IV del texto encriptado
  const iv = Buffer.from(ivHex, "hex"); // Convertimos el IV de hex a buffer
  const decipher = crypto.createDecipheriv(
    "aes-256-cbc",
    Buffer.from(SECRET_KEY),
    iv
  ); // Creamos el descifrador
  let decrypted = decipher.update(encryptedData, "hex", "utf8");
  decrypted += decipher.final("utf8"); // Desencriptamos
  return decrypted; // Devolvemos el ID original
}
