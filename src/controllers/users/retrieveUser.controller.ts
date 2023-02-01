import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import retrieveUserService from "../../services/users/retrieveUser.service";

const retrieveUserController = async (req: Request, res: Response) => {
  const id: string = req.params.id;
  const admin: boolean = req.user.isAdm;
  const user = await retrieveUserService(id, admin);

  return res.status(200).json(instanceToPlain(user));
};

export default retrieveUserController;
