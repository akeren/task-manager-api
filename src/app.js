import express from "express";

import taskRouter from "./api/routes/task.js";
import userRouter from "./api/routes/user.js";

const app = express();
app.use(express.json());

// ROUTES
app.use(userRouter);
app.use(taskRouter);

export default app;
