import { Request, Response } from "express";
import { IContactRequest } from "../../interfaces/contacts.interface";
import createContactService from "../../services/contacts/createContact.service";

const createContactController = async (req: Request, res: Response) => {
  const data: IContactRequest = req.body;
  const clientId: string = req.params.id;
  const createdContact = await createContactService(data, clientId);

  return res.status(201).json(createdContact);
};
export default createContactController;
