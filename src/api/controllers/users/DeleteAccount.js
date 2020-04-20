const {
	sendCancelationEmailMessage
} = require('../../../utils/emails/account');
module.exports = async (req, res) => {
	try {
		await req.user.remove();
		sendCancelationEmailMessage(req.user.email, req.user.name);
		res.send(req.user);
	} catch (e) {
		res.status(500).send(e);
	}
};
