import { AppError } from "../errors/AppError";
import { Request, Response, NextFunction } from "express";
import AppDataSource from "../data-source";
import { User } from "../entities/users.entity";

const ensureIsActiveMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const username: string = req.body.username;
  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOneBy({
    username,
  });

  if (!user) {
    throw new AppError("Invalid username or password", 403);
  }

  if (user && user.isActive === false) {
    throw new AppError("Invalid username or password", 403);
  }
  return next();
};

export default ensureIsActiveMiddleware;
