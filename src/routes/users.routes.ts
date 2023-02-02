import { Router } from "express";
import createUserController from "../controllers/users/createUser.controller";
import deleteUserController from "../controllers/users/deleteUser.controller";
import listUsersController from "../controllers/users/listUsers.controller";
import retrieveUserController from "../controllers/users/retrieveUser.controller";
import updateUserController from "../controllers/users/updateUser.controller";
import userProfileController from "../controllers/users/userProfile.controller";
import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware";
import ensureEmailAlreadyExistMiddleware from "../middlewares/ensureEmailAlreadyExists.middleware";
import ensureIsAdmMiddleware from "../middlewares/ensureIsAdm.middleware";

const userRoutes = Router();

userRoutes.post("", ensureEmailAlreadyExistMiddleware, createUserController);
userRoutes.get("/profile", ensureAuthMiddleware, userProfileController);
userRoutes.get("/:user_id", ensureAuthMiddleware, ensureIsAdmMiddleware, retrieveUserController);
userRoutes.get("", ensureAuthMiddleware, ensureIsAdmMiddleware, listUsersController);
userRoutes.patch("/:user_id", ensureAuthMiddleware, updateUserController);
userRoutes.delete("/:user_id", ensureAuthMiddleware, deleteUserController);

export default userRoutes;
