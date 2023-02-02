import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import listClientsService from "../../services/clients/listClients.service";

const listClientsController = async (req: Request, res: Response) => {
  const idLoggedUser: string = req.user.id;
  const clients = await listClientsService(idLoggedUser);

  return res.status(200).json(instanceToPlain(clients));
};

export default listClientsController;
