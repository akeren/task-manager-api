const User = require('../../models/User');
module.exports = async (req, res) => {
	try {
		const user = await User.findByLoginCredentials(
			req.body.email,
			req.body.password
		);
		const token = await user.generateAuthToken();
		res.send({ user, token });
	} catch (e) {
		res.status(400).send(e);
	}
};
