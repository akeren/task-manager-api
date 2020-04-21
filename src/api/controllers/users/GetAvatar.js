const User = require('../../models/User');
module.exports = async (req, res) => {
	try {
		const user = await User.findById(req.params.id);
		if (!user || !user.avatar) {
			throw new Error();
		}
		res.set('Content-Type', 'image/png');
		res.send();
		res.status(200).json({ status: 'success', user: user.avatar });
	} catch (error) {
		res.status(404).json({ status: 'fail', error });
	}
};
