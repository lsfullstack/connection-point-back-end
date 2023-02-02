import { Router } from "express";
import createContactController from "../controllers/contacts/createContact.controller";
import listContactsController from "../controllers/contacts/listContacts.controller";
import retrieveContactController from "../controllers/contacts/retrieveContact.controller";
import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware";

const contactRoutes = Router();

contactRoutes.post("/:client_id", ensureAuthMiddleware, createContactController);
contactRoutes.get("/:client_id", ensureAuthMiddleware, listContactsController);
contactRoutes.get("/client/:contact_id", ensureAuthMiddleware, retrieveContactController);

export default contactRoutes;
