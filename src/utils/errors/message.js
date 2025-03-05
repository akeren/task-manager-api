const message = (error, req, res, next) => {
	res.status(400).json({ status: "fail", error: error.message });
};

export default message;
