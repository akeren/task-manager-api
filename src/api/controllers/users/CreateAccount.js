import User from "../../models/User.js";
import { sendWelcomeEmailMessage } from "../../../utils/emails/account.js";

const createAccount = async (req, res) => {
	try {
		const { email } = req.body;

		// Checking if the user is already in the database.
		const existingAccount = await User.findOne({ email: email });
		if (existingAccount) {
			return res
				.status(400)
				.json({ status: "fail", message: "Account already exists!" });
		}
		// We create a new account after the request body is validated.
		const user = new User(req.body);
		await user.save();

		sendWelcomeEmailMessage(user.email, user.name);

		if (!user) {
			throw new Error("Unable to create Account!");
		}
		res.status(201).json({ status: "success", user });
	} catch (error) {
		res.status(400).json({ status: "fail", error });
	}
};

export default createAccount;
