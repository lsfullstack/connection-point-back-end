import { Router } from "express";
import createContactController from "../controllers/contacts/createContact.controller";
import deleteContactController from "../controllers/contacts/deleteContact.controller";
import listContactsController from "../controllers/contacts/listContacts.controller";
import retrieveContactController from "../controllers/contacts/retrieveContact.controller";
import updateContactController from "../controllers/contacts/updateContact.controller";
import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware";

const contactRoutes = Router();

contactRoutes.post("/:id", ensureAuthMiddleware, createContactController);
contactRoutes.get("/:id", ensureAuthMiddleware, listContactsController);
contactRoutes.get("/client/:id", ensureAuthMiddleware, retrieveContactController);
contactRoutes.patch("/:id", ensureAuthMiddleware, updateContactController);
contactRoutes.delete("/:id", ensureAuthMiddleware, deleteContactController);

export default contactRoutes;
