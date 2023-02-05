import AppDataSource from "../../data-source";
import { Client } from "../../entities/clients.entity";
import { AppError } from "../../errors/AppError";

const deleteClientService = async (clientId: string): Promise<void> => {
  const clientRepository = AppDataSource.getRepository(Client);
  const findClient = await clientRepository.findOneBy({
    id: clientId
  });

  if (!findClient) {
    throw new AppError("Client not found", 404);
  }

  await clientRepository.delete({ 
    id: clientId 
  });
};

export default deleteClientService;
