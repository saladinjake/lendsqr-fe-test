/*barrel script to autoload all reducers*/
import { combineReducers } from "redux";
import authReducer from "./auth.reducer";

//barrel reducer as root reducer
const rootReducer  =combineReducers({

  auth:authReducer
});

export type RootState = ReturnType<typeof rootReducer>
export default rootReducer