module.exports = async (req, res) => {
	try {
		req.user.avatar = undefined;
		await req.user.save();
		res.send();
		res.status(204).send();
	} catch (error) {
		res.status(500).json({ status: 'fail', error });
	}
};
