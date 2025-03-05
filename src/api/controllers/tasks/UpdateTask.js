import mongoose from "mongoose";
import Task from "../../models/Task.js";

export const updateTask = async (req, res) => {
	try {
		const { id } = req.params;
		// Validate ObjectId format
		if (!mongoose.isValidObjectId(id)) {
			return res.status(400).json({
				success: false,
				message: "Invalid task ID format.",
			});
		}

		const updatedTask = await Task.findByIdAndUpdate(id, req.body, {
			new: true,
			runValidators: true,
		});

		if (!updatedTask) {
			return res.status(404).json({ status: "fail", error: "Task not found." });
		}

		res.status(200).json({ success: true, updatedTask });
	} catch (error) {
		console.error("error while updating the task", error);
		res.status(400).json({ success: false, message: "Internal server error" });
	}
};

export default updateTask;
