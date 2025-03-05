import dotenv from "dotenv";
dotenv.config();
import http from "http";
import app from "./app.js";
import { connectDB } from "./utils/db/mongoose.js";
connectDB();

const PORT = process.env.PORT || 5991;

const server = http.createServer(app);

server.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
