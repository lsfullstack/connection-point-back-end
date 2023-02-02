import { IUser } from "./users.interface";

export interface IClientRequest {
  name: string,
  email: string,
  phone: string,
  age: number,
}

export interface IClient extends IClientRequest {
  id: string,
  createdAt: Date,
  updatedAt: Date,
  user: IUser,
}

export interface ICLientUpdate extends IClientRequest {
  
}
