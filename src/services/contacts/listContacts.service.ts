import AppDataSource from "../../data-source";
import { Client } from "../../entities/clients.entity";
import { Contact } from "../../entities/contact.entity";
import { AppError } from "../../errors/AppError";
import { IContact } from "../../interfaces/contacts.interface";

const listContactsService = async (clientId: string): Promise<IContact[]> => {
  const contactRepository = AppDataSource.getRepository(Contact);
  const clientRepository = AppDataSource.getRepository(Client);

  const findClient = await clientRepository.findOneBy({ 
    id: clientId
  });

  if (!findClient) {
    throw new AppError("Client not found", 404);
  }

  const contacts = await contactRepository.find({
    where: {
      client: {
        id: findClient.id,
      },
    },
    relations: {
      client: true,
    },
  });

  return contacts;
};

export default listContactsService;
