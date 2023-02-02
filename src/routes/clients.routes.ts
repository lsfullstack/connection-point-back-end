import { Router } from "express";
import createClientController from "../controllers/clients/createClient.controller";
import listClientsController from "../controllers/clients/listClients.controller";
import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware";

const clientRoutes = Router();

clientRoutes.post("", ensureAuthMiddleware, createClientController);
clientRoutes.get("", ensureAuthMiddleware, listClientsController);

export default clientRoutes;
