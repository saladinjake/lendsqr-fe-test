/*setup react redux store*/
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import logger from "redux-logger";
import rootReducer from "./reducers";
import { persistStore } from "redux-persist";


const initialState = {};
const middlewareArr = [thunk, logger];

const Store = createStore(
  rootReducer,
  initialState,
  //middleware
  composeWithDevTools(applyMiddleware(...middlewareArr))
);
const persistor = persistStore(Store);

export { persistor };

export default Store;












