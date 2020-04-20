const multer = require('multer');

const upload = multer({
	limits: {
		fileSize: 1000000
	},
	fileFilter(req, file, cb) {
		if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
			return cb(new Error('Please upload an Image!'));
		}
		cb(undefined, true);
	}
});

module.exports = upload;
