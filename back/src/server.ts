import express from "express";
import productRoutes from "./routes/product.route"; // Asegúrate de que la ruta sea correcta

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/", productRoutes); // Aquí asegúrate de que las rutas estén montadas correctamente

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
