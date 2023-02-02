import { Router } from "express";
import createClientController from "../controllers/clients/createClient.controller";
import deleteClientController from "../controllers/clients/deleteClient.controller";
import listClientsController from "../controllers/clients/listClients.controller";
import retrieveClientController from "../controllers/clients/retrieveClient.controller";
import updateClientController from "../controllers/clients/updateClient.controller";
import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware";

const clientRoutes = Router();

clientRoutes.post("", ensureAuthMiddleware, createClientController);
clientRoutes.get("", ensureAuthMiddleware, listClientsController);
clientRoutes.get("/:client_id", ensureAuthMiddleware, retrieveClientController);
clientRoutes.patch("/:client_id", ensureAuthMiddleware, updateClientController);
clientRoutes.delete("/:client_id", ensureAuthMiddleware, deleteClientController);

export default clientRoutes;
