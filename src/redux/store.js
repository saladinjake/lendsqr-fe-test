/*setup react redux store*/
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import logger from "redux-logger";
import rootReducer from "./reducers";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "cart",
  storage,
  whitelist: ["cart"],
};
//persist the state

const initialState = {};
const middlewareArr = [thunk, logger];

const pReducer = persistReducer(persistConfig, rootReducer);

const Store = createStore(
  rootReducer,
  initialState,
  //middleware
  composeWithDevTools(applyMiddleware(...middlewareArr))
);
const persistor = persistStore(Store);

export { persistor };

export default Store;












