const mongoose = require('mongoose');
(async () => {
	try {
		return await mongoose.connect(process.env.DB_URL, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
			useFindAndModify: false
		});
	} catch (error) {
		console.log('Error', error);
	}
})();
