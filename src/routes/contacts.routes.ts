import { Router } from "express";
import createContactController from "../controllers/contacts/createContact.controller";
import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware";

const contactRoutes = Router();

contactRoutes.post("/:id", ensureAuthMiddleware, createContactController);

export default contactRoutes;
