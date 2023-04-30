import {
  GET_USERS,
  USER_ERROR,
  SET_LOADING
} from "./types";
import { getUsers } from "services/users";

export const fetchCourses = () => async (dispatch) => {
  try {
    await setLoading();
    const res = await getUsers();
    dispatch({
      type: GET_USERS,
      payload: res.data.data.courses,
    });
  } catch (err) {
    dispatch({
      type: USER_ERROR,
      payload: "An Error occured",
    });
  }
};

export const setLoading = () => async (dispatch) => {
  dispatch({
    type: SET_LOADING,
  });
};
