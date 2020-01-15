import {
  SIGNUP_UPDATE_VALUES,
  SIGNUP_SUBMIT_FORM,
  SIGNUP_SUBMIT_PIN,
  SIGNUP_END
} from "./types";
import axios from "axios";

export const signupUpdateValues = value => dispatch => {
  dispatch({
    type: SIGNUP_UPDATE_VALUES,
    payload: value
  });
};

export const signupSubmitForm = (username, email, password) => dispatch => {
  let request = new URLSearchParams({
    signup: true,
    username,
    email,
    password
  });
  axios
    .post("http://api.coilab.com/user", request)
    .then(res => res.data)
    .then(data =>
      dispatch({
        type: SIGNUP_SUBMIT_FORM,
        payload: data.status
      })
    )
    .catch(err => console.log(err));
};

export const signupSubmitPin = (username, verification_pin) => dispatch => {
  let request = new URLSearchParams({
    signup_token_verification: true,
    username,
    signup_token: verification_pin
  });
  axios
    .post("http://api.coilab.com/user", request)
    .then(res => res.data)
    .then(data =>
      dispatch({
        type: SIGNUP_SUBMIT_PIN,
        payload: data.status
      })
    );
};

export const signupEnd = () => dispatch => {
  dispatch({
    type: SIGNUP_END,
    payload: undefined
  });
};
