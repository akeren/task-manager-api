import { sendCancellationEmailMessage } from "../../../utils/emails/account.js";
import User from "../../models/User.js";

const deleteAccount = async (req, res) => {
	try {
		const userId = req.user._id;

		const accountToBeDeleted = await User.findByIdAndDelete(userId);
		if (!accountToBeDeleted) {
			return res
				.status(404)
				.json({ success: false, message: "Account not found" });
		}

		res.json({ success: true, message: "Account deleted successfully" });
		sendCancellationEmailMessage(req.user.email, req.user.name);
	} catch (error) {
		console.error("Delete account error", error);
		res.status(500).json({ success: false, message: "Internal server error" });
	}
};

export default deleteAccount;
