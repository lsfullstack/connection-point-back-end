import { Request, Response } from "express";
import retrieveContactService from "../../services/contacts/retrieveContact.service";

const retrieveContactController = async (req: Request, res: Response) => {
  const contactId: string = req.params.id;
  const contact = await retrieveContactService(contactId);

  return res.status(200).json(contact);
};

export default retrieveContactController;
