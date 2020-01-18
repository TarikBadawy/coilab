import userReducer from "./userReducer";
import errorReducer from "./errorReducer";
import { combineReducers } from "redux";

const combinedReducers = combineReducers({
  user: userReducer,
  error: errorReducer
});

export default combinedReducers;
