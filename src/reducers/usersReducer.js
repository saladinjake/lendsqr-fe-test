import {
    GET_USERS,
    USER_ERROR,
    SET_LOADING,
} from '../actions/types';

const initialState = {
  courses: [],
  categories: [],
  courseLoading: true,
  error: null,
};

const courseReducer = (state=initialState,action) => {
    switch(action.type) {
        case GET_USERS:
            return {
              ...state,
              courses: action.payload,
              courseLoading: false,
            };
        case SET_LOADING:
            return {
              ...state,
              courseLoading: true
            }
        case USER_ERROR:
            return {
                ...state,
                error:action.payload,
                loading:false
            }
        default:
            return state;
    }
}


export default courseReducer