import jwt from "jsonwebtoken";

const generarJWT = (id, user, name) => {
	return jwt.sign({ id, user, name }, process.env.JWT_SECRET, {
		expiresIn: "30d",
	});
};

export default generarJWT;
