import { Request, Response } from "express";
import { IContactUpdate } from "../../interfaces/contacts.interface";
import updateContactService from "../../services/contacts/updateContact.service";

const updateContactController = async (req: Request, res: Response) => {
  const contactId: string = req.params.id;
  const contact: IContactUpdate = req.body;
  const updatedContact = await updateContactService(contactId, contact);
  
  return res.status(200).json(updatedContact);
};

export default updateContactController;
