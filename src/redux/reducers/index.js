import userReducer from "./userReducer";
import signupReducer from "./signupReducer";
import { combineReducers } from "redux";

const combinedReducers = combineReducers({
  user: userReducer,
  signup: signupReducer
});

export default combinedReducers;
