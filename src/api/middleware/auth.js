const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async (req, res, next) => {
	try {
		const tokenProvidedByUser = req
			.header('Authorization')
			.replace('Bearer ', '');
		const decode = jwt.verify(tokenProvidedByUser, process.env.JWT_SECRET_KEY);
		const user = await User.findOne({
			_id: decode._id,
			'tokens.token': tokenProvidedByUser
		});
		if (!user) {
			throw new Error();
		}
		req.token = tokenProvidedByUser;
		req.user = user;
		next();
	} catch (e) {
		res.status(401).json({ status: 'fail', error: 'Please authenticate.' });
	}
};

module.exports = auth;
