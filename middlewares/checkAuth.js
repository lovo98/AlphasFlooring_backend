import jwt from "jsonwebtoken";
import Usuario from "../models/Usuario.js";

const checkAuth = async (req, res, next) => {
	let token;
	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith("Bearer")
	) {
		try {
			token = req.headers.authorization.split(" ")[1];
			console.log("TOKEN", req.headers.authorization);
			const decode = jwt.verify(token, process.env.JWT_SECRET);
			req.usuario = await Usuario.findById(decode.id);
			return next();
		} catch (error) {
			return res
				.status(400)
				.json({ mensaje: "Ocurrio un error al válidar token" });
		}
	}

	if (!token) {
		const error = new Error("Token no válido");
		return res.status(401).json({ mensaje: error.message });
	}

	next();
};

export default checkAuth;
