import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import retrieveClientService from "../../services/clients/retrieveClient.service";

const retrieveClientController = async (req: Request, res: Response) => {
  const clientId: string = req.params.id;
  const client = await retrieveClientService(clientId);

  return res.status(200).json(instanceToPlain(client));
};

export default retrieveClientController;
