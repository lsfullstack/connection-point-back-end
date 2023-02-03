import AppDataSource from "../../data-source";
import { Client } from "../../entities/clients.entity";
import { AppError } from "../../errors/AppError";
import { IClient, ICLientUpdate } from "../../interfaces/clients.interface";

const updateClientService = async (clientId: string, client: ICLientUpdate): Promise<IClient> => {
  const { name, email, phone, age } = client;
  const clientRepository = AppDataSource.getRepository(Client);
  const findClient = await clientRepository.findOne({ 
    where: {
      id: clientId 
    },
    relations: {
      user: true
    }
  });

  if (!findClient) {
    throw new AppError("Client not found", 404);
  }

  await clientRepository.update(
    {
      id: clientId
    },
    {
      name: name ? name : findClient.name,
      email: email ? email : findClient.email,
      phone: phone ? phone : findClient.phone,
      age: age ? age : findClient.age
    }
  );

  const findUpdatedClient = await clientRepository.findOne({
    where: {
      id: clientId
    },
    relations: {
      user: true
    },
  });

  return findUpdatedClient!;
};

export default updateClientService;
