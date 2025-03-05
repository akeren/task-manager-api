import express from "express";
import auth from "../middleware/auth.js";
import upload from "../middleware/upload.js";
import {
	validateUserForCreating,
	validateUserForUpdating,
} from "../validations/userValidation.js";

/*
 ** import controllers
 */
import CreateAccount from "../controllers/users/CreateAccount.js";
import Login from "../controllers/users/Login.js";
import Profile from "../controllers/users/Profile.js";
import UpdateAccount from "../controllers/users/UpdateAccount.js";
import DeleteAccount from "../controllers/users/DeleteAccount.js";
import UploadAvatar from "../controllers/users/UploadAvatar.js";
import DeleteAvatar from "../controllers/users/DeleteAvatar.js";
import GetAvatar from "../controllers/users/GetAvatar.js";

// utils
import errorMessage from "../../utils/errors/message.js";

const router = express.Router();

router.post("/users", validateUserForCreating, CreateAccount);
router.post("/users/login", Login);

router.use(auth);

router.get("/users/me", Profile);
router.patch("/users/me", validateUserForUpdating, UpdateAccount);
router.delete("/users/me", DeleteAccount);
router
	.route("/users/me/avatar")
	.post(upload.single("avatar"), UploadAvatar, errorMessage)
	.delete(DeleteAvatar);
router.get("/users/:id/avatar", GetAvatar);

export default router;
