const Task = require('../../models/Task');
module.exports = async (req, res) => {
	const updates = Object.keys(req.body);
	const allowedUpdates = ['completed', 'description'];
	const isValidOperation = updates.every((update) => {
		return allowedUpdates.includes(update);
	});

	if (!isValidOperation) {
		return res
			.status(400)
			.json({ status: 'fail', error: 'Invalid Updates....!' });
	}
	try {
		const task = await Task.findOne({
			_id: req.params.id,
			owner: req.user._id
		});
		if (!task) {
			return res.status(404).send();
		}
		updates.forEach((update) => (task[update] = req.body[update]));
		await task.save();
		res.status(200).json({ status: 'success', task });
	} catch (error) {
		res.status(400).json({ status: 'fail', error });
	}
};
