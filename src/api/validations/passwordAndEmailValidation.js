const Joi = require("joi");

const passwordAndEmailValidation = Joi.object({
	newPassword: Joi.string()
		.min(8)
		.max(30)
		.pattern(/^[a-zA-Z0-9!@#$%^&*()_+=[\]{};':"\\|,.<>/?]*$/)
		.required()
		.messages({
			"string.base": '"newPassword" should be a type of string',
			"string.min": '"newPassword" should have at least 8 characters',
			"string.max": '"newPassword" should have no more than 30 characters',
			"string.pattern.base":
				'"newPassword" can only contain alphanumeric characters and special symbols',
			"any.required": '"newPassword" is required',
		}),
	newEmail: Joi.string().email().required().messages({
		"string.base": '"newEmail" should be a type of string',
		"string.email": '"newEmail" must be a valid email address',
		"any.required": '"newEmail" is required',
	}),
	currentPassword: Joi.string().required().messages({
		"string.base": '"currentPassword" should be a type of string',
		"any.required": '"currentPassword" is required',
	}),
});

export const validatePasswordAndEmail = (req, res, next) => {
	const { error } = passwordAndEmailValidation.validate(req.body);

	if (error) {
		return res
			.status(400)
			.json({ success: false, message: error.details[0].message });
	}
	next();
};
