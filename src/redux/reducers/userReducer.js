import {
  USER_LOG_IN,
  USER_LOG_OUT,
  USER_STATUS_UPDATE
} from "../actions/types";

const initialState = {
  username: "",
  email: "",
  login_token: "",
  login_status: "",
  logout_status: undefined
};

export default function(state = initialState, action) {
  switch (action.type) {
    case USER_LOG_IN:
      return { ...action.payload };
    case USER_LOG_OUT:
      return { ...initialState };
    case USER_STATUS_UPDATE:
      return { ...state, login_status: action.payload };
    default:
      return state;
  }
}
