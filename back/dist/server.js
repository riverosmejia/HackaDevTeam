"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const product_route_1 = __importDefault(require("./routes/product.route")); // Asegúrate de que la ruta sea correcta
const env_1 = require("./config/env");
const app = (0, express_1.default)();
const PORT = env_1.ENV.PORT;
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use("/", product_route_1.default); // Aquí asegúrate de que las rutas estén montadas correctamente
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
