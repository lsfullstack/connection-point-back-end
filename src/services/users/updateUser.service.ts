import { hash } from "bcryptjs";
import AppDataSource from "../../data-source";
import { User } from "../../entities/users.entity";
import { AppError } from "../../errors/AppError";
import { IUser, IUserUpdate } from "../../interfaces/users.interface";

const updateUserService = async (isAdm: boolean, id: string, user: IUserUpdate, idLoggedUser: string): Promise<IUser> => {
  const userRepository = AppDataSource.getRepository(User);
  const findUser = await userRepository.findOneBy({ id });
  const { name, username, email, password } = user;

  if (id !== idLoggedUser && !isAdm) {
    throw new AppError("User is not admin", 401);
  }

  if (!findUser) {
    throw new AppError("User not found", 404);
  }

  await userRepository.update(id, {
    name: name ? name : findUser.name,
    username: username ? username : findUser.username,
    email: email ? email : findUser.email,
    password: password ? await hash(password, 10) : findUser.password,
  });

  const updatedUser = await userRepository.findOneBy({
    id,
  });

  return updatedUser!;
};

export default updateUserService;
