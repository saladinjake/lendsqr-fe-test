/*barrel script to autoload all reducers*/
import { combineReducers } from "redux";
import authReducer from "./auth.reducer";

//barrel reducer as root reducer
export default combineReducers({
  auth: authReducer,
});
