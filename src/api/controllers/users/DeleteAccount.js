const {
	sendCancelationEmailMessage
} = require('../../../utils/emails/account');
module.exports = async (req, res) => {
	try {
		await req.user.remove();
		sendCancelationEmailMessage(req.user.email, req.user.name);
		res.status(204).send();
	} catch (error) {
		res.status(500).json({ status: 'fail', error });
	}
};
