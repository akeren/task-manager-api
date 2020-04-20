const User = require('../../models/User');
const { sendWelcomeEmailMessage } = require('../../../utils/emails/account');
module.exports = async (req, res) => {
	const user = new User(req.body);
	try {
		await user.save();
		sendWelcomeEmailMessage(user.email, user.name);
		if (!user) {
			throw new Error('Unable to create Account!');
		}
		const token = await user.generateAuthToken();
		res.status(201).send({ user, token });
	} catch (e) {
		res.status(400).send(e);
	}
};
