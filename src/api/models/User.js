import mongoose from "mongoose";
const { Schema, model } = mongoose;
import bcrypt from "bcryptjs";
import Task from "./Task.js";

const userSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true,
		},
		email: {
			type: String,
			unique: true,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
		age: {
			type: Number,
		},
		avatar: {
			type: Buffer,
		},
	},
	{
		timestamps: true,
	}
);

// Hash the plain text password before saving
userSchema.pre("save", async function (next) {
	if (this.isModified("password")) {
		this.password = await bcrypt.hash(this.password, 8);
	}
	next();
});

// Delete user's tasks when user is removed
userSchema.pre("remove", async function (next) {
	await Task.deleteMany({ owner: this._id });
	next();
});

export default model("User", userSchema);
