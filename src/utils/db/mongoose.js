import mongoose from "mongoose";
export const connectDB = async () => {
	try {
		await mongoose.connect(process.env.DB_URL, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
			useFindAndModify: false,
		});
	} catch (error) {
		console.error("Error", error);
	}
};
