import Joi from "joi";

const taskSchemaForCreating = Joi.object({
	description: Joi.string().trim().min(3).max(255).required().messages({
		"string.empty": "Description cannot be empty.",
		"string.min": "Description must be at least 3 characters long.",
		"string.max": "Description cannot exceed 255 characters.",
		"any.required": "Description is required.",
	}),
	completed: Joi.boolean(),
});
const taskSchemaForUpdating = Joi.object({
	description: Joi.string().trim().min(3).max(255).messages({
		"string.empty": "Description cannot be empty.",
		"string.min": "Description must be at least 3 characters long.",
		"string.max": "Description cannot exceed 255 characters.",
	}),
	completed: Joi.boolean(),
});

export const validateTaskForCreating = (req, res, next) => {
	const { error } = taskSchemaForCreating.validate(req.body, {
		abortEarly: false,
	});

	if (error) {
		return res.status(400).json({
			success: false,
			errors: error.details.map((err) => err.message),
		});
	}

	next();
};
export const validateTaskForUpdating = (req, res, next) => {
	const { error } = taskSchemaForUpdating.validate(req.body, {
		abortEarly: false,
	});

	if (error) {
		return res.status(400).json({
			success: false,
			errors: error.details.map((err) => err.message),
		});
	}

	next();
};
