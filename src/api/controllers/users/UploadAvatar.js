const sharp = require('sharp');
const UploadAvatar = async (req, res) => {
	try {
		const modifyImageBuffer = await sharp(req.file.buffer)
			.resize({ width: 250, height: 250 })
			.png()
			.toBuffer();
		req.user.avatar = modifyImageBuffer;
		await req.user.save();
		res.send();
	} catch (e) {
		res.status(500).send();
	}
};

module.exports = UploadAvatar;
