import { Router } from "express";
import createClientController from "../controllers/clients/createClient.controller";
import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware";

const clientRoutes = Router();

clientRoutes.post("", ensureAuthMiddleware, createClientController);

export default clientRoutes;
