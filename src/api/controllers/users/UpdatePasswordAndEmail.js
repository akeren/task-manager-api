// Controller function to update password and email
import { generateAuthToken } from "../../../utils/generateAuthToken.js";
import User from "../../models/User.js";

const updatePasswordAndEmail = async (req, res) => {
	const { newPassword, newEmail, currentPassword } = req.body;

	try {
		const userId = req.user.id;
		if (!userId || !newPassword || !newEmail || !currentPassword) {
			return res
				.status(400)
				.json({ success: false, message: "All fields are required" });
		}

		const user = await User.findById(userId);
		if (!user) {
			return res
				.status(404)
				.json({ success: false, message: "User not found" });
		}

		const isPasswordCorrect = await bcrypt.compare(
			currentPassword,
			user.password
		);
		if (!isPasswordCorrect) {
			return res
				.status(401)
				.json({ success: false, message: "Current password is incorrect" });
		}

		const emailExists = await User.findOne({ email: newEmail });
		if (emailExists && emailExists._id.toString() !== user._id.toString()) {
			return res.status(400).json({ message: "Email is already in use" });
		}

		const hashedPassword = await bcrypt.hash(newPassword, 12);

		user.email = newEmail;
		user.password = hashedPassword;

		await user.save();

		// Optionally, regenerate a new JWT token and send it to the client
		const token = generateAuthToken({ userId: user._id });

		res.status(200).json({
			success: true,
			message: "Password and email updated successfully",
			token,
			user: {
				_id: user._id,
				email: user.email,
			},
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ success: false, message: "Internal server error" });
	}
};
export default updatePasswordAndEmail;
