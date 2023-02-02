export interface IUserRequest {
  name: string,
  username: string,
  email: string,
  password: string,
  isAdm: boolean,
}

export interface IUser extends IUserRequest {
  createdAt: Date,
  updatedAt: Date,
  isActive: boolean,
}

export interface IUserLogin {
  username: string,
  password: string,
}

export interface IUserUpdate {
  name?: string,
  username?: string,
  email?: string,
  password?: string,
}
