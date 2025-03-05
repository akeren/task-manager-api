import Task from "../../models/Task.js";

const getAllTasks = async (req, res) => {
	try {
		const match = { owner: req.user.id };
		const sort = {};

		if (req.query?.completed) {
			match.completed = req.query.completed === "true";
		}

		if (req.query?.sortBy) {
			// example: sortBy=field:asc
			const [field, order] = req.query.sortBy.split(":");
			if (!["asc", "desc"].includes(order?.toLowerCase())) {
				return res.status(400).json({
					success: false,
					error: "Allowed values for sorting are 'asc' or 'desc'.",
				});
			}
			sort[field] = order.toLowerCase() === "desc" ? -1 : 1;
		}

		const limit = parseInt(req.query.limit) || 10;
		const skip = parseInt(req.query.skip) || 0;

		const allTasks = await Task.find(match).sort(sort).skip(skip).limit(limit);

		res.status(200).json({ success: true, tasks: allTasks });
	} catch (error) {
		console.error("Error fetching tasks:", error);
		res.status(500).json({
			success: false,
			message: error.message || "Internal server error",
		});
	}
};

export default getAllTasks;
