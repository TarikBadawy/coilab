import { USER_LOGIN, USER_LOGOUT } from "../actions/types";

const initialState = {
  username: undefined,
  email: undefined,
  auth_token: undefined
};

export default function(state = initialState, action) {
  switch (action.type) {
    case USER_LOGIN:
      return { ...action.payload };

    case USER_LOGOUT:
      return { ...initialState };

    default:
      return state;
  }
}
