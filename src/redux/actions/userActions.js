import { USER_LOG_IN, USER_LOG_OUT, USER_STATUS_UPDATE } from "./types";
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
          type: USER_LOG_IN,
          payload: { ...data, login_status: "success" }
        });
      } else {
        dispatch({
          type: USER_STATUS_UPDATE,
          payload: data.status
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
      console.log(data);
      if (data.status === "success") {
        dispatch({
          type: USER_LOG_OUT,
          payload: { username: "", email: "", token: "", login_status: "" }
        });
      } else {
        dispatch({
          type: USER_STATUS_UPDATE,
          payload: data.status
        });
      }
    })
    .catch(err => console.log(err));
};
