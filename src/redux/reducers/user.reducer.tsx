import { GET_USERS, SET_LOADING, USER_ERROR } from "../actions/types";

const cachedUsers =
  localStorage.getItem("users") !== undefined &&
  JSON?.parse("" + localStorage.getItem("users"));

const initialState = {
  users: cachedUsers ? cachedUsers : null,
};

export const getAllUsersFromStore = (state: any) => state?.users;

const userReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        loading: false,
        users: action.payload.users,
      };
    case USER_ERROR:
        return {
            ...state,
            users:[],
            error:true
        }

    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};

export default userReducer;
