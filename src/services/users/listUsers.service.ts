import AppDataSource from "../../data-source";
import { User } from "../../entities/users.entity";
import { IUser } from "../../interfaces/users.interface";

const listUsersService = async (): Promise<IUser[]> => {
  const userRepository = AppDataSource.getRepository(User);
  const users = userRepository.find();

  return users;
};

export default listUsersService;
