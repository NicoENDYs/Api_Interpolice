// importamos la libreria
import express from "express";
import "dotenv/config";
import cors from "cors";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

import { verifyToken } from "./src/authMiddleware.js";

import ciudadanos from "./src/ciudadanos.js";
import usuarios from "./src/usuarios.js";
import delitoTipos from "./src/delitoTipos.js";
import delitoEventos from "./src/delitoEventos.js";
import antecedentes from "./src/antecedentes.js";
import amonestaciones from "./src/amonestaciones.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// CORS
const corsOptions = {
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: ["Content-Type", "Authorization"],
};
const app = express();
app.use(express.json());
app.use(cors(corsOptions));

// 1) Rutas públicas (login)
app.use("/api", usuarios); // /usuario/login vive aquí (debe ser público)

// 2) Middleware de auth: todo lo que sigue requiere token
app.use("/api", verifyToken);

// 3) Rutas protegidas
app.use("/api", ciudadanos);
app.use("/api", delitoTipos);
app.use("/api", delitoEventos);
app.use("/api", antecedentes);
app.use("/api", amonestaciones);

// Archivos estáticos (públicos es OK)
app.use("/qr", express.static(path.join(__dirname, "qr")));
app.use("/fotos", express.static(path.join(__dirname, "fotos")));

// Encender API
const port = process.env.APP_port || 4100;
app.listen(port, () => {
    console.log(`Api ejecutándose en el puerto http://localhost:${port}`);
});
