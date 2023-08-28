import { legacy_createStore as  createStore,applyMiddleware} from 'redux';
import { configureStore } from "@reduxjs/toolkit";
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from "./reducers/index";



const initialState = {};
const middleware = [thunk];

const store = configureStore({
    reducer:rootReducer
})
export type RootState = ReturnType<typeof rootReducer>

export default store;