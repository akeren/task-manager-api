import express from "express";
import auth from "../middleware/auth.js";
import {
	validateTaskForCreating,
	validateTaskForUpdating,
} from "../validations/taskValidation.js";

/*
 ** import controllers
 */

import CreateTask from "../controllers/tasks/CreateTask.js";
import GetAllTasks from "../controllers/tasks/GetAllTasks.js";
import GetSingleTask from "../controllers/tasks/GetSingleTask.js";
import UpdateTask from "../controllers/tasks/UpdateTask.js";
import DeleteTask from "../controllers/tasks/DeleteTask.js";

const router = express.Router();

router.use(auth);

router.get("/tasks", GetAllTasks);
router.post("/tasks", validateTaskForCreating, CreateTask); // validateTask middleware is added here

// GET /tasks?completed=true
// GET /tasks?limit=2&skip=2
// GET /tasks?sortBy=createdAt:desc

router.get("/tasks/:id", GetSingleTask);
router.patch("/tasks/:id", validateTaskForUpdating, UpdateTask); // validateTask middleware is added here
router.delete("/tasks/:id", DeleteTask);

export default router;
