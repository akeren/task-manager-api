module.exports = async (req, res) => {
	const updates = Object.keys(req.body);
	const allowedUpdates = ['name', 'email', 'password', 'age'];
	const isValidOperation = updates.every((update) => {
		return allowedUpdates.includes(update);
	});
	if (!isValidOperation) {
		return res.status(400).json({ status: 'fail', error: 'Invalid Updates..' });
	}
	try {
		updates.forEach((update) => (req.user[update] = req.body[update]));
		await req.user.save();
		res.status(200).json({ status: 'success', user: req.user });
	} catch (error) {
		res.status(400).json({ status: 'fail', error });
	}
};
