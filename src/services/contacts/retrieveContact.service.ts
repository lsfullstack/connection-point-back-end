import AppDataSource from "../../data-source";
import { Contact } from "../../entities/contact.entity";
import { AppError } from "../../errors/AppError";
import { IContact } from "../../interfaces/contacts.interface";

const retrieveContactService = async (contactId: string): Promise<IContact> => {
  const contactRepository = AppDataSource.getRepository(Contact);
  const contact = await contactRepository.findOne({
    where: {
      id: contactId
    },
    relations: {
      client: true
    }
  });

  if (!contact) {
    throw new AppError("Contact not found", 404);
  }

  return contact;
};

export default retrieveContactService;
