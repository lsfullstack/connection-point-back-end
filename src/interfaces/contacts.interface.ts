import { IClient } from "./clients.interface";

export interface IContactRequest {
  name: string,
  email: string,
  phone: string,
}

export interface IContact extends IContactRequest {
  id: string,
  createdAt: Date,
  updatedAt: Date,
  client: IClient,
}

