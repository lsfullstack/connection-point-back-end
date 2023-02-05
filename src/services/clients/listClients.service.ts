import AppDataSource from "../../data-source";
import { Client } from "../../entities/clients.entity";
import { IClient } from "../../interfaces/clients.interface";

const listClientsService = async (idLoggedUser: string): Promise<IClient[]> => {
  const clientRepository = AppDataSource.getRepository(Client);

  const findClients = await clientRepository.find({
    where: {
      user: { id: idLoggedUser },
    },
    relations: {
      user: true,
      contacts: true
    }
  });

  return findClients;
};

export default listClientsService;
