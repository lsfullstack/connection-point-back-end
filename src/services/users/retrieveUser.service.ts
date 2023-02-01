import AppDataSource from "../../data-source";
import { IUser } from "../../interfaces/users.interface";
import { User } from "../../entities/users.entity";
import { AppError } from "../../errors/AppError";

const retrieveUserService = async (id: string, admin: boolean): Promise<IUser> => {
  const userRepository = AppDataSource.getRepository(User);
  const findUser = await userRepository.findOneBy({ id });

  if (!findUser) {
    throw new AppError("User not found", 404);
  }

  if ((!admin && findUser.isAdm) || (!admin && findUser.isActive == false)) {
    throw new AppError("User is not admin", 401);
  }

  return findUser;
};

export default retrieveUserService;
