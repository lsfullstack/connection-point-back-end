import AppDataSource from "../../data-source";
import { User } from "../../entities/users.entity";
import { IUser } from "../../interfaces/users.interface";

const userProfileService = async (id: string): Promise<IUser> => {
  const userRepository = AppDataSource.getRepository(User);
  const findUser = await userRepository.findOneBy({ id });

  return findUser!;
};

export default userProfileService;