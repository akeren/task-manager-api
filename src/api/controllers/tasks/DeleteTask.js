import mongoose from "mongoose";
import Task from "../../models/Task.js";

const deleteTask = async (req, res) => {
	try {
		const { id } = req.params;

		// Validate ObjectId format
		if (!mongoose.isValidObjectId(id)) {
			return res.status(400).json({
				success: false,
				message: "Invalid task ID format.",
			});
		}

		const task = await Task.findOneAndDelete({
			_id: id,
			owner: req.user._id,
		});

		if (!task) {
			return res.status(404).json({
				success: false,
				message: "Task not found.",
			});
		}

		res.status(200).json({
			success: true,
			message: "Task deleted successfully.",
			task,
		});
	} catch (error) {
		console.error("Error deleting task:", error);
		res.status(500).json({
			success: false,
			message: error.message || "Internal server error.",
		});
	}
};

export default deleteTask;
