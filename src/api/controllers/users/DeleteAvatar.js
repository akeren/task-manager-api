module.exports = async (req, res) => {
	try {
		req.user.avatar = undefined;
		await req.user.save();
		res.send();
	} catch (e) {
		res.status(500).send();
	}
};
