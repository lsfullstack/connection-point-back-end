import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import { IClientRequest } from "../../interfaces/clients.interface";
import createClientService from "../../services/clients/createClient.service";

const createClientController = async (req: Request, res: Response) => {
  const data: IClientRequest = req.body;
  const user: string = req.user.id;
  const createdClient = await createClientService(data, user);

  return res.status(201).json(instanceToPlain(createdClient));
}

export default createClientController;
