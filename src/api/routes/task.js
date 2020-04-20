const express = require('express');
const auth = require('../middleware/auth');

/*
 ** import controllers
 */
const CreateTask = require('../controllers/tasks/CreateTask');
const GetAllTasks = require('../controllers/tasks/GetAllTasks');
const GetSingleTask = require('../controllers/tasks/GetSingleTask');
const UpdateTask = require('../controllers/tasks/UpdateTask');
const DeleteTask = require('../controllers/tasks/DeleteTask');

const router = express.Router();

router.use(auth);

router.route('/tasks').post(CreateTask).get(GetAllTasks);

// GET /tasks?completed=true
// GET /tasks?limit=2&skip=2
// GET /tasks?sortBy=createdAt:desc

router
	.route('/tasks/:id')
	.get(GetSingleTask)
	.patch(UpdateTask)
	.delete(DeleteTask);

module.exports = router;
