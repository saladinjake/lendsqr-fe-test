import {
    GET_USERS,
    USER_ERROR,
    SET_LOADING
  } from "./types";
  import { getUsers } from "../../api/user.service";
  
  export const fetchUsers = () => async (dispatch: any) => {
    try {
      await setLoading();
      const res = await getUsers();
      dispatch({
        type: GET_USERS,
        payload: res.data.data,
      });
    } catch (err) {
      dispatch({
        type: USER_ERROR,
        payload: "An Error occured",
      });
    }
  };
  
  export const setLoading = () => async (dispatch: any) => {
    dispatch({
      type: SET_LOADING,
    });
  };