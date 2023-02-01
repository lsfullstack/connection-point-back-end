import { hash } from "bcryptjs";
import AppDataSource from "../../data-source";
import { User } from "../../entities/users.entity";
import { IUser, IUserRequest } from "../../interfaces/users.interface";

const createUserService = async (user: IUserRequest) => {
  const { name, username, email, password, isAdm } = user;

  const userRepository = AppDataSource.getRepository(User);
  const newUser: IUser = userRepository.create({
    name,
    username,
    email,
    isAdm,
    password: await hash(password, 10),
  });

  await userRepository.save(newUser);

  return newUser;
};

export default createUserService;
