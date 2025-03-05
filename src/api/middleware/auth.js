import User from "../models/User.js";
import { verifyAuthToken } from "../../utils/generateAuthToken.js";

const authenticateToken = async (req, res, next) => {
	const token = req.headers.authorization?.split(" ")[1];

	if (!token) {
		return res
			.status(403)
			.json({ message: "Access denied. No token provided" });
	}

	try {
		const decoded = verifyAuthToken(token);

		const user = await User.findById(decoded.id).select("-password");
		if (!user) {
			return res
				.status(401)
				.json({ message: "Invalid token or user does not exist" });
		}
		req.user = user;
		next();
	} catch (error) {
		res.status(401).json({ message: "Invalid or expired token" });
	}
};

export default authenticateToken;
