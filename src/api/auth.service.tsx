/* eslint-disable no-unused-vars */
import axios from "./api_config/axios.config";

/*lms config auth*/
let base_url = "https://mocky.io/";

export function _userId(userId: string) {
  if (typeof userId !== "undefined") {
    sessionStorage.setItem("userId", userId);

    return;
  }

  return sessionStorage.getItem("userId");
}

export function _token(token: any) {
  if (typeof token !== "undefined") {
    sessionStorage.setItem("token", token);

    return;
  }

  return sessionStorage.getItem("token");
}

/*enrollment api*/
export const loginUser = async (details: any) => {
  let request = axios.post("auth/login", details);
  return request.then((response: any) => {
    if (response.status === 200) {
      return response && response;
    }
  });
};

export const logoutUser = () => {
  sessionStorage.clear();
  localStorage.clear();
};
