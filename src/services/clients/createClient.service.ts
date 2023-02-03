import AppDataSource from "../../data-source";
import { Client } from "../../entities/clients.entity";
import { User } from "../../entities/users.entity";
import { IClient, IClientRequest } from "../../interfaces/clients.interface";

const createClientService = async (data: IClientRequest, user: string): Promise<IClient> => {
  const userRepository = AppDataSource.getRepository(User);
  const clientRepository = AppDataSource.getRepository(Client);

  const findUser = await userRepository.findOneBy({
    id: user
  });

  const { name, email, phone, age } = data;
  const client = clientRepository.create({
    name,
    email,
    phone,
    age,
    user: findUser!,
    contacts: []
  });

  await clientRepository.save(client);

  return client;
}

export default createClientService;
