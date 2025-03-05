import Joi from "joi";

// User schema validation
const userSchemaForCreating = Joi.object({
	name: Joi.string().trim().min(2).max(50).required().messages({
		"string.empty": "Name cannot be empty.",
		"string.min": "Name must be at least 2 characters long.",
		"string.max": "Name cannot exceed 50 characters.",
		"any.required": "Name is required.",
	}),
	email: Joi.string().trim().lowercase().email().required().messages({
		"string.empty": "Email cannot be empty.",
		"string.email": "Invalid email format.",
		"any.required": "Email is required.",
	}),
	password: Joi.string()
		.min(6)
		.max(30)
		.pattern(new RegExp("(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)"))
		.required()
		.messages({
			"string.empty": "Password cannot be empty.",
			"string.min": "Password must be at least 6 characters long.",
			"string.max": "Password cannot exceed 30 characters.",
			"string.pattern.base":
				"Password must contain at least one uppercase letter, one lowercase letter, and one number.",
			"any.required": "Password is required.",
		}),
	age: Joi.number().integer().min(0).messages({
		"number.base": "Age must be a number.",
		"number.integer": "Age must be a whole number.",
		"number.min": "Age cannot be negative.",
	}),
});
const userSchemaForUpdating = Joi.object({
	name: Joi.string().trim().min(2).max(50).messages({
		"string.empty": "Name cannot be empty.",
		"string.min": "Name must be at least 2 characters long.",
		"string.max": "Name cannot exceed 50 characters.",
	}),
	email: Joi.string().trim().lowercase().email().messages({
		"string.empty": "Email cannot be empty.",
		"string.email": "Invalid email format.",
	}),
	age: Joi.number().integer().min(0).messages({
		"number.base": "Age must be a number.",
		"number.integer": "Age must be a whole number.",
		"number.min": "Age cannot be negative.",
	}),
});

// Middleware for validating user data
export const validateUserForCreating = (req, res, next) => {
	const { error } = userSchemaForCreating.validate(req.body, {
		abortEarly: false,
	});

	if (error) {
		return res.status(400).json({
			status: "fail",
			errors: error.details.map((err) => err.message),
		});
	}

	next();
};
export const validateUserForUpdating = (req, res, next) => {
	const { error } = userSchemaForUpdating.validate(req.body, {
		abortEarly: false,
	});

	if (error) {
		console.log("heelo");
		return res.status(400).json({
			status: "fail",
			errors: error.details.map((err) => err.message),
		});
	}

	next();
};
