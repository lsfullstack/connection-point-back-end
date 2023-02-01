import { Router } from "express";
import createUserController from "../controllers/users/createUser.controller";
import ensureEmailAlreadyExistMiddleware from "../middlewares/ensureEmailAlreadyExists.middleware";

const userRoutes = Router();

userRoutes.post("", ensureEmailAlreadyExistMiddleware, createUserController);

export default userRoutes;
