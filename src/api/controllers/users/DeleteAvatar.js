const deleteAvatar = async (req, res) => {
	try {
		req.user.avatar = undefined;
		await req.user.save();
		res.send();
		res.status(204).send();
	} catch (error) {
		console.error(error);
		res.status(500).json({ success: true, message: "Internal server error" });
	}
};
export default deleteAvatar;
