import { Request, Response } from "express";
import deleteClientService from "../../services/clients/deleteClient.service";

const deleteClientController = async (req: Request, res: Response) => {
  const clientId: string = req.params.id;
  await deleteClientService(clientId);
  return res.status(204).send();
};

export default deleteClientController;
