import {
  SIGNUP_UPDATE_VALUES,
  SIGNUP_SUBMIT_FORM,
  SIGNUP_SUBMIT_PIN,
  SIGNUP_END
} from "../actions/types";

const initialState = {
  username: "",
  email: "",
  password: "",
  signup_pin: "",
  form_status: "",
  pin_status: ""
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SIGNUP_UPDATE_VALUES:
      return { ...state, ...action.payload };

    case SIGNUP_SUBMIT_FORM:
      return { ...state, form_status: action.payload };

    case SIGNUP_SUBMIT_PIN:
      return { ...state, pin_status: action.payload };

    case SIGNUP_END:
      return action.payload;

    default:
      return state;
  }
}
