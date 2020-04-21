const Task = require('../../models/Task');
module.exports = async (req, res) => {
	try {
		const task = await Task.findOneAndDelete({
			_id: req.params.id,
			owner: req.user._id
		});
		if (!task) {
			return res.status(404).send();
		}
		res.status(204).send();
	} catch (error) {
		res.status(500).json({ status: 'fail', error });
	}
};
