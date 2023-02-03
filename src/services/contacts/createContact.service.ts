import AppDataSource from "../../data-source";
import { Client } from "../../entities/clients.entity";
import { Contact } from "../../entities/contact.entity";

import { AppError } from "../../errors/AppError";
import { IContact, IContactRequest } from "../../interfaces/contacts.interface";

const createContactService = async (data: IContactRequest, clientId: string): Promise<IContact> => {
  const { name, email, phone } = data;
  const contactRepository = AppDataSource.getRepository(Contact);
  const clientRepository = AppDataSource.getRepository(Client);
  const findClient = await clientRepository.findOneBy({
    id: clientId
  });

  if (!findClient) {
    throw new AppError("Client not found", 404);
  }

  const contact = contactRepository.create({
    name,
    email,
    phone,
    client: findClient
  });

  await contactRepository.save(contact);

  return contact;
};

export default createContactService;
