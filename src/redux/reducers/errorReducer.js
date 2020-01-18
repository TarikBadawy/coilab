import { ERROR_SET, ERROR_UNSET } from "../actions/types";

const initialState = {
  error_message: undefined
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ERROR_SET:
      return { error_message: action.payload };

    case ERROR_UNSET:
      return { ...initialState };

    default:
      return state;
  }
}
