import { AxiosResponse } from "axios";
import { IResponse } from "../Common.types";
import { postCall, getCall } from "../../apiCalls";

import endpoints from "./endpoints";

export const AUTH_URL = endpoints.LOGIN_URL;
export const FORGET_URL = endpoints.FORGET_PASS_URL;
export const RESET_URL = endpoints.CHANGE_PASSWORD_URL;
export const LOGOUT_URL = endpoints.LOGOUT_URL;
export const USER_IDENTITY_PROFILE = endpoints.USER_IDENTITY_PROFILE;
export const USERS_URL = endpoints.USERS_URL;
export const USER_URL = endpoints.USER_URL;
export const  UPDATE_PASSWORD_URL = endpoints.UPDATE_PASSWORD_URL
export interface IUser {
  success: boolean;
  status_code: number;
  user: any;
  user_roles: any[];
  access_token: string;
  token_type: string;
  expires_at: string;
}

export interface IUserProfile{
  id: number;
  employeeNumber: string;
  username: string;
  first_name: string;
  middle_name?: string | null;
  last_name: string;
  email: string;
  phone_number: string;
  image_url?: string | null;
  instructor_profile?: string | null;
  roles: any[];
}

export const getLoggedinUserProfile = async () =>
  getCall(`${USER_IDENTITY_PROFILE}`, {}).then((res) => res.data);

export const getAllUsers = (
  data = { pageSize: 10, pageNumber: 1 },
  params = null,
  headerConfig = null
) => getCall(`${USERS_URL}`, data).then((res) => res.data);

export const getUsersByFilter = (data, params = null, headerConfig = null) =>
  postCall(`${USERS_URL}`, data, params, headerConfig) as Promise<
    AxiosResponse<IResponse & { data: IUser[] }>
  >;

export const getUserById = (id) =>
  getCall(`${USER_URL}/`+ id, {}).then((res) => res.data);
