import AppDataSource from "../../data-source";
import { Contact } from "../../entities/contact.entity";
import { AppError } from "../../errors/AppError";
import { IContact, IContactUpdate } from "../../interfaces/contacts.interface";

const updateContactService = async (contactId: string, contact: IContactUpdate): Promise<IContact> => {
  const contactRepository = AppDataSource.getRepository(Contact);
  const findContact = await contactRepository.findOneBy({
    id: contactId
  });

  if (!findContact) {
    throw new AppError("Contact not found", 404);
  }

  const { name, email, phone } = contact;

  await contactRepository.update(
    {
      id: contactId
    },
    {
      name: name ? name : findContact.name,
      email: email ? email : findContact.email,
      phone: phone ? phone : findContact.phone
    }
  );

  const updatedContact = await contactRepository.findOne({
    where: {
      id: contactId,
    },
    relations: {
      client: true,
    },
  });

  return updatedContact!;
};

export default updateContactService;
