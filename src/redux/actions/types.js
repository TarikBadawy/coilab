export const USER_LOGIN = "USER_LOGIN";
export const USER_LOGOUT = "USER_LOGOUT";

export const ERROR_SET = "ERROR_LOGIN";
export const ERROR_UNSET = "ERROR_LOGOUT";

export const ERRMSG = {
  login_empty_field: "All fields are required.",
  login_username_invalid: "Incorrect username or password.",
  login_password_invalid: "Incorrect username or password.",

  signup_empty_field: "All fields are required.",
  signup_password_invalid:
    "The password can only contain between 8 and 128 characters.",
  signup_email_taken: "The email is already taken.",
  signup_email_invalid: "This email is invalid.",
  signup_username_taken: "The username is already taken.",
  signup_username_invalid:
    "This username is invalid [CHARACTERS: A-Z / a-z / 0-9, LENGTH: 5-20].",

  signup_token_invalid: "The code is invalid.",
  signup_token_invalid_new_email_sent:
    "The code is invalid. A new verification email will be sent.",
  signup_token_expired: "Your code has expired."
};
