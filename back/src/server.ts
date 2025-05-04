import express from "express";
import cors from "cors";
import productRoutes from "./routes/product.route"; // Asegúrate de que la ruta sea correcta
import { ENV } from "./config/env";

const app = express();
const PORT = ENV.PORT;

app.use(express.json());
app.use(cors());
app.use("/", productRoutes); // Aquí asegúrate de que las rutas estén montadas correctamente

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
