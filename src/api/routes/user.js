const express = require('express');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');

/*
 ** import controllers
 */
const CreateAccount = require('../controllers/users/CreateAccount');
const Login = require('../controllers/users/Login');
const Logout = require('../controllers/users/Logout');
const LogoutAllAccounts = require('../controllers/users/LogoutAllAccounts');
const Profile = require('../controllers/users/Profile');
const UpdateAccount = require('../controllers/users/UpdateAccount');
const DeleteAccount = require('../controllers/users/DeleteAccount');
const UploadAvatar = require('../controllers/users/UploadAvatar');
const DeleteAvatar = require('../controllers/users/DeleteAvatar');
const GetAvatar = require('../controllers/users/GetAvatar');

// utils
const errorMessage = require('../../utils/errors/message');

const router = express.Router();

router.post('/users', CreateAccount);
router.post('/users/login', Login);

router.use(auth);

router.post('/users/logout', Logout);
router.post('/users/logoutAll', LogoutAllAccounts);
router
	.route('/users/me')
	.get(Profile)
	.patch(UpdateAccount)
	.delete(DeleteAccount);
router
	.route('/users/me/avatar')
	.post(upload.single('avatar'), UploadAvatar, errorMessage)
	.delete(DeleteAvatar);
router.get('/users/:id/avatar', GetAvatar);

module.exports = router;
