import User from "../../models/User.js";
import bcrypt from "bcryptjs";
import { generateAuthToken } from "../../../utils/generateAuthToken.js";

const login = async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = await User.findOne({ email: email });

		// Checking if the user is already registered
		if (!user) {
			return res
				.status(401)
				.json({ success: false, message: "Invalid email or password" });
		}

		// Checking if the user's password is correct
		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			return res
				.status(401)
				.json({ success: false, message: "Invalid email or password" });
		}

		// Generating the JWT token using the generateAuthToken()
		// function in utils folder.
		const token = generateAuthToken({ id: user._id, email: user.email });

		res.json({
			success: true,
			message: "Login successful",
			token: token,
			user: { id: user._id, name: user.name, email: user.email },
		});
	} catch (error) {
		res.status(500).json({ status: false, message: "Internal server error" });
	}
};
export default login;
