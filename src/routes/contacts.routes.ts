import { Router } from "express";
import createContactController from "../controllers/contacts/createContact.controller";
import listContactsController from "../controllers/contacts/listContacts.controller";
import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware";

const contactRoutes = Router();

contactRoutes.post("/:id", ensureAuthMiddleware, createContactController);
contactRoutes.get("/:id", ensureAuthMiddleware, listContactsController);

export default contactRoutes;
