import AppDataSource from "../../data-source";
import { Client } from "../../entities/clients.entity";
import { AppError } from "../../errors/AppError";
import { IClient } from "../../interfaces/clients.interface";

const retrieveClientService = async (clientId: string): Promise<IClient> => {
  const clientRepository = AppDataSource.getRepository(Client);
  const findClient = await clientRepository.findOne({
    where: {
      id: clientId,
    },
    relations: {
      user: true,
      contacts: true,
    }
  });

  if (!findClient) {
    throw new AppError("Client not found", 404);
  }

  return findClient;
};

export default retrieveClientService;
