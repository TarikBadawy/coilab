import {
  USER_LOGIN,
  USER_LOGOUT,
  ERROR_SET,
  ERROR_UNSET,
  ERRMSG
} from "./types";
import axios from "axios";

export const userLogIn = (username_or_email, password) => dispatch => {
  let request = new URLSearchParams({
    login: true,
    username_or_email,
    password
  });
  axios
    .post("http://api.coilab.com/user", request)
    .then(res => res.data)
    .then(data => {
      if (data.status === "success") {
        dispatch({
          type: USER_LOGIN,
          payload: {
            username: data.username,
            email: data.email,
            auth_token: data.login_token
          }
        });
        dispatch({ type: ERROR_UNSET });
      } else {
        let error_message = ERRMSG[data.status];
        dispatch({
          type: ERROR_SET,
          payload: error_message
        });
      }
    })
    .catch(err => console.log(err));
};

export const userLogOut = login_token => dispatch => {
  let request = new URLSearchParams({
    logout: true,
    login_token
  });
  axios
    .post("http://api.coilab.com/user", request)
    .then(res => res.data)
    .then(data => {
      if (data.status === "success") {
        dispatch({
          type: USER_LOGOUT,
          payload: {
            username: undefined,
            email: undefined,
            token: undefined
          }
        });
        dispatch({ type: ERROR_UNSET });
      } else {
        let error_message = ERRMSG[data.status];
        dispatch({
          type: ERROR_SET,
          payload: error_message
        });
      }
    })
    .catch(err => console.log(err));
};
