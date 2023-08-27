import {
  ADD_TO_CART,
  GET_COURSES,
  COURSE_ERROR,
  REMOVE_FROM_CART,
  ADD_QUANTITY,
  SUB_QUANTITY,
  CLEAR_CART,
  GET_CART
} from "./types";
import { getCourses } from "../../../api/courses.services";
import { DecryptCart, EncryptCart} from "../../../api/encrypter"

export const fetchCourses = () => async (dispatch) => {
  try {
    const res = await getCourses();
    dispatch({
      type: GET_COURSES,
      payload: res.data.data.courses,
    });
  } catch (err) {
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

};

export const removeFromCart = (id) => async (dispatch) => {
  //manual removal logic for storage cart
  dispatch({
    type: REMOVE_FROM_CART,
    payload: id,
  });
};

export const addQuantity = (id) => async (dispatch) => {
  dispatch({
    type: ADD_QUANTITY,
    payload: id,
  });
};

export const subQuantity = (id) => async (dispatch) => {
  dispatch({
    type: SUB_QUANTITY,
    payload: id,
  });
};

export const clearCart = () => async (dispatch) => {
  console.log("cart cleared action");
  dispatch({
    type: CLEAR_CART,
  });
};


// export const getCart  = () => async (dispatch) =>{
//    dispatch({
//     type: GET_CART
//    })
// }