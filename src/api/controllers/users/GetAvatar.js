import User from "../../models/User.js";
const getAvatar = async (req, res) => {
	try {
		const user = await User.findById(req.params.id);
		if (!user || !user.avatar) {
			throw new Error();
		}
		res.set("Content-Type", "image/png");
		res.send();
		res.status(200).json({ success: true, user: user.avatar });
	} catch (error) {
		res.status(404).json({ success: false, error });
	}
};
export default getAvatar;
