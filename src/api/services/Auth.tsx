import { postCall , postCallMock } from "../apiCalls";
import endpoints from "./User/endpoints";
import {
  AUTH_URL,
  FORGET_URL,
  LOGOUT_URL,
  RESET_URL,
  UPDATE_PASSWORD_URL
} from "./User";
import { IUser } from "./User";
import { IResponse } from "./Common.types";
import { AxiosResponse } from "axios";



export const authenticateUser = (data, params = null, headerConfig = null) =>
  postCallMock(`${AUTH_URL}`, data, params, headerConfig) as Promise<
    AxiosResponse<IResponse & { user: any, message: string }>
  >;

export const logOut = (data=null, params = null, headerConfig = null) =>
 postCall(`${LOGOUT_URL}`, data, params, headerConfig) as Promise<
  AxiosResponse<IResponse & { users: IUser[] }>
>;

export const forgetPassword = (data, params = null, headerConfig = null) =>
 postCall(`${FORGET_URL}`, data, params, headerConfig) as Promise<
  AxiosResponse<IResponse & { users: IUser[] }>
>;

export const resetPassword = (data, params = null, headerConfig = null) =>
 postCall(`${RESET_URL}`, data, params, headerConfig) as Promise<
  AxiosResponse<IResponse & { users: IUser[] }>
>;

export const updatePassword = (data, params = null, headerConfig = null) =>
 postCall(`${UPDATE_PASSWORD_URL}`, data, params, headerConfig) as Promise<
  AxiosResponse<IResponse & { users: IUser[] }>
>;
