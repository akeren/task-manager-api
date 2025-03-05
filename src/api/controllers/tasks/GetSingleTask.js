import mongoose from "mongoose";
import Task from "../../models/Task.js";

const getSingleTask = async (req, res) => {
	try {
		const { id } = req.params;
		// Validate ObjectId format

		if (!mongoose.isValidObjectId(id)) {
			return res.status(400).json({
				success: false,
				error: "Invalid task ID format.",
			});
		}

		const task = await Task.findOne({ _id: id, owner: req.user._id });

		if (!task) {
			return res.status(404).json({
				success: false,
				message: "Task not found",
			});
		}

		res.status(200).json({ success: true, task: task });
	} catch (error) {
		console.error("Error fetching task:", error);
		res.status(500).json({
			success: false,
			message: "Internal server error.",
		});
	}
};

export default getSingleTask;
