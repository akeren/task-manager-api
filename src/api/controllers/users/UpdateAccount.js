import User from "../../models/User.js";
const updateAccount = async (req, res) => {
	try {
		const userId = req.user.id;
		const updatedAccount = await User.findByIdAndUpdate(userId, req.body, {
			new: true,
			runValidators: true,
		}).select("-password");

		if (!updatedAccount) {
			return res.status(401).json({ message: "Account not found" });
		}

		res.status(200).json({ success: true, user: updatedAccount });
	} catch (error) {
		console.error("Error while updating the account", error);
		res.status(400).json({ success: false, message: "Internal server error" });
	}
};

export default updateAccount;
