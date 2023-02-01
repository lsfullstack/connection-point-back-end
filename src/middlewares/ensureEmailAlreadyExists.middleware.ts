import { AppError } from "../errors/AppError";
import { Request, Response, NextFunction } from "express";
import AppDataSource from "../data-source";
import { IUserRequest } from "../interfaces/users.interface";
import { User } from "../entities/users.entity";

const ensureEmailAlreadyExistMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const { email }: IUserRequest = req.body;
  const userRepository = AppDataSource.getRepository(User);
  const userExist = await userRepository.findOneBy({ email });

  if (userExist) {
    throw new AppError("E-mail already exists", 409);
  }

  return next();
};

export default ensureEmailAlreadyExistMiddleware;
