import Task from "../../models/Task.js";

const createTask = async (req, res) => {
	try {
		const task = new Task({
			...req.body,
			owner: req.user._id,
		});
		await task.save();

		res.status(201).json({ success: true, task });
	} catch (error) {
		console.error("Error creating task:", error);
		res.status(400).json({
			success: false,
			message: error.message || "Failed to create task.",
		});
	}
};

export default createTask;
