export interface IUser {
  _id: string;
  name?: string;
  email?: string;
  password?: string;
  passwordToken?: string;
  passwordTokenExpires?: Date;
  passwordTokenActive?: boolean;
  verify?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
