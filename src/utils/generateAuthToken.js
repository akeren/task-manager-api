import jwt from "jsonwebtoken";

export const generateAuthToken = (payload) => {
	return jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: "24h" });
};

export const verifyAuthToken = (token) => {
	try {
		return jwt.verify(token, process.env.JWT_SECRET_KEY);
	} catch (error) {
		return null;
	}
};
