const Task = require('../../models/Task');
module.exports = async (req, res) => {
	const updates = Object.keys(req.body);
	const allowedUpdates = ['completed', 'description'];
	const isValidOperation = updates.every((update) => {
		return allowedUpdates.includes(update);
	});

	if (!isValidOperation) {
		return res.status(400).send({ error: 'Invalid Updates....!' });
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
		res.send(task);
	} catch (e) {
		res.status(400).send(e);
	}
};
