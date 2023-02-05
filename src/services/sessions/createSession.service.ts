import AppDataSource from "../../data-source";
import { compare } from "bcryptjs";
import jwt from "jsonwebtoken";
import { AppError } from "../../errors/AppError";
import "dotenv/config";
import { IUserLogin } from "../../interfaces/users.interface";
import { User } from "../../entities/users.entity";

const createSessionService = async (data: IUserLogin): Promise<string> => {
  const { username, password } = data;
  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOneBy({
    username
  });

  const passwordMatch = await compare(password, user!.password);

  if (!passwordMatch) {
    throw new AppError("Invalid username or password", 403);
  }

  const token = jwt.sign({
    isAdm: user!.isAdm,
  },
    process.env.SECRET_KEY as string,
    {
      expiresIn: "24h",
      subject: user!.id
    });

  return token;
};

export default createSessionService;
