import User from "../../models/User.js";
import { sendWelcomeEmailMessage } from "../../../utils/emails/account.js";

const createAccount = async (req, res) => {
	try {
		const { email } = req.body;

		const existingAccount = await User.findOne({ email: email });
		if (existingAccount) {
			return res
				.status(400)
				.json({ success: false, message: "Account already exists!" });
		}

		const user = new User(req.body);
		await user.save();

		sendWelcomeEmailMessage(user.email, user.name);

		if (!user) {
			throw new Error("Unable to create Account!");
		}
		res.status(201).json({ success: true, user });
	} catch (error) {
		console.error("Error while creating account", error);
		res.status(400).json({ success: false, message: "Internal server error" });
	}
};

export default createAccount;
