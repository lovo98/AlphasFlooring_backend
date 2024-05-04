import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import conectarDB from "./config/db.js";
import usuarioRoutes from "./routes/usuarioRoutes.js";
import testimonialsRouter from "./routes/testimonialsRoutes.js";

const app = express();
app.use(express.json());
dotenv.config();
conectarDB();

// congigurando cros
const whiteList = [process.env.FRONT_URL];

const corsOptions = {
	origin: function (origin, callback) {
		if (whiteList.includes(origin)) {
			callback(null, true);
		} else {
			callback(new Error("Error de cros"));
		}
	},
};

app.use(cors());

// ROUTING
app.use("/api/usuarios", usuarioRoutes);
app.use("/api/testimonials", testimonialsRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`entro en el puerto ${PORT}`);
});
