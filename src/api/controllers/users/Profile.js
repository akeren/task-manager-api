import User from "../../models/User.js";
const profile = async (req, res) => {
	try {
		const userId = req.user.id;
		const user = await User.findById(userId).select("-password");

		if (!user) {
			return res
				.status(401)
				.json({ success: false, message: "User not found" });
		}
		res.json({ success: true, user: user });
	} catch (error) {
		console.error("Error while retrieving user information", error);
		res.status(500).json({ success: false, message: "Internal server error" });
	}
};

export default profile;
