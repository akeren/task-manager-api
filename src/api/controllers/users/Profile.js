module.exports = async (req, res) => {
	res.status(200).json({ status: 'success', user: req.user });
};
