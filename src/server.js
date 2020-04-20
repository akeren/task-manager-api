const http = require('http');
const { app } = require('./app');

const port = process.env.PORT || 5991;

const server = http.createServer(app);

server.listen(port, () => {
	console.log(`Server listening on port ${port}`);
});
