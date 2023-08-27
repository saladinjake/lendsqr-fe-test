import {
  ADD_TO_CART,
  GET_COURSES,
  COURSE_ERROR,
  REMOVE_FROM_CART,
  ADD_QUANTITY,
  SUB_QUANTITY,
  CLEAR_CART,
} from "./types";

import { getCourses } from "../../../api/courses.services";

export const fetchCourses = () => async (dispatch) => {
  try {
    const res = await getCourses();
    dispatch({
      type: GET_COURSES,
      payload: res.data.data.courses,
    });
  } catch (err) {
    console.log("error check api"+ err)
    dispatch({
      type: COURSE_ERROR,
      payload: "An Error occured",
    });
  }
};

export const addToCart = (id) => async (dispatch) => {
  
  dispatch({
    type: ADD_TO_CART,
    payload: id,
  });

  setTimeout(() => {
    window.location.reload();
  }, 3000);
};

