import Usuario from "../models/Usuario.js";
import generarJWT from "../helpers/generarJWT.js";

const registerUser = async (req, res) => {
	// evitando usuarios duplicados
	const { user } = req.body;
	const existeUsuario = await Usuario.findOne({ user });
	if (existeUsuario) {
		const error = new Error("Already registered user");
		return res.status(400).json({ mensaje: error.message });
	}
	try {
		const usuario = new Usuario(req.body);
		await usuario.save();
		res.json({ mensaje: "Usuario creado" });
	} catch (error) {
		res.json({ mensaje: `Error: ${error}` });
	}
};

const autenticar = async (req, res) => {
	// comporbar si existe
	const { user, password } = req.body;
	const usuario = await Usuario.findOne({ user });
	if (!usuario) {
		const error = new Error("User does not exist");
		return res.status(404).json({ mensaje: error.message });
	}

	// comprar password
	if (await usuario.comprobarPassword(password)) {
		res.json({
			_id: usuario._id,
			user: usuario.user,
			name: usuario.name,
			token: generarJWT(usuario._id, usuario.user, usuario.name),
		});
	} else {
		const error = new Error("Incorrect password");
		return res.status(404).json({ mensaje: error.message });
	}
};

const perfil = async (req, res) => {
	const { usuario } = req;
	return res.json(usuario);
};

export { registerUser, autenticar, perfil };
