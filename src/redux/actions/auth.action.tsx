import {
  RESET_ERROR,
  LOGIN_SUCCESS,
  //LOGIN_FAIL,
  LOGOUT,
  SET_PATH,
  SET_LOADING,
} from "./types";

export const setLoading = () => async (dispatch: any) => {
  dispatch({
    type: SET_LOADING,
  });
};
export const login = (response: any) => async (dispatch: any) => {
  dispatch({
    type: LOGIN_SUCCESS,
    payload: response,
  });
};

export const setPrevPath = (path: string) => async (dispatch: any) => {
  dispatch({
    type: SET_PATH,
    payload: path,
  });
};

export const resetErrFlag = () => async (dispatch:any) => {
  dispatch({
    type: RESET_ERROR,
  });
};

export const logOut = () => async (dispatch: any) => {
  dispatch({
    type: LOGOUT,
  });
};
