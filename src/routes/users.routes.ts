import { Router } from "express";
import createUserController from "../controllers/users/createUser.controller";
import retrieveUserController from "../controllers/users/retrieveUser.controller";
import userProfileController from "../controllers/users/userProfile.controller";
import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware";
import ensureEmailAlreadyExistMiddleware from "../middlewares/ensureEmailAlreadyExists.middleware";
import ensureIsAdmMiddleware from "../middlewares/ensureIsAdm.middleware";

const userRoutes = Router();

userRoutes.post("", ensureEmailAlreadyExistMiddleware, createUserController);
userRoutes.get("/profile", ensureAuthMiddleware, userProfileController);
userRoutes.get("/:id", ensureAuthMiddleware, ensureIsAdmMiddleware, retrieveUserController);

export default userRoutes;
