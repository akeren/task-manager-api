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

		res.status(200).json({ status: "success", user: updatedAccount });
	} catch (error) {
		res.status(400).json({ status: "fail", error });
	}
};

export default updateAccount;
