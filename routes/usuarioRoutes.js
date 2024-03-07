import express from "express";
import {
	registerUser,
	autenticar,
	perfil,
} from "../controllers/usuariosController.js";
import checkAuth from "../middlewares/checkAuth.js";

const router = express.Router();
// athentication and register users
router.post("/register-user", registerUser);
router.post("/login", autenticar);
router.get("/perfil", checkAuth, perfil);

export default router;
