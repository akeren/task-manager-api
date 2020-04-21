module.exports = (error, req, res, next) => {
	res.status(400).json({ status: 'fail', error: error.message });
};
