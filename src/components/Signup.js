import React, { Component } from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { userLogIn } from "../redux/actions/userActions";
import {
  signupUpdateValues,
  signupSubmitForm,
  signupSubmitPin,
  signupEnd
} from "../redux/actions/signupActions";

class SignupCard extends Component {
  handleFormSubmit = () => {
    this.props.signupSubmitForm(
      this.props.signup.username,
      this.props.signup.email,
      this.props.signup.password
    );
  };

  handlePinSubmit = () => {
    this.props.signupSubmitPin(
      this.props.signup.username,
      this.props.signup.signup_pin
    );
  };

  handleChange = e => {
    this.props.signupUpdateValues({ [e.target.name]: e.target.value });
  };

  componentDidUpdate() {
    if (
      this.props.signup.form_status === "success" &&
      this.props.signup.pin_status === "success" &&
      this.props.user.login_status === ""
    ) {
      this.props.userLogIn(this.props.signup.email, this.props.signup.password);
      this.props.signupEnd();
    }
  }

  render() {
    if (this.props.user.login_status === "success") {
      return <Redirect to="space" />;
    }

    let error_message = undefined;
    switch (this.props.signup.form_status) {
      case "password_invalid":
        error_message =
          "The password can only contain between 8 and 128 characters";
        break;
      case "email_taken":
        error_message = "The email is already taken";
        break;
      case "email_invalid":
        error_message = "This email is invalid";
        break;
      case "username_taken":
        error_message = "The username is already taken";
        break;
      case "username_invalid":
        error_message =
          "This username is invalid [CHARACTERS: A-Z / a-z / 0-9, LENGTH: 5-20]";
        break;
      case "empty_fields":
        error_message = "All fields sre required";
        break;
      default:
        break;
    }

    switch (this.props.signup.pin_status) {
      case "signup_token_invalid":
        error_message = "The pin is invalid";
        break;
      case "signup_token_invalid_new_email_sent":
        error_message =
          "The pin is invalid. A new verification email will be sent";
        break;
      case "signup_token_expired":
        error_message = "Your pin has expired";
        break;
      default:
        break;
    }

    let button = undefined;
    if (this.props.signup.form_status !== "success") {
      button = (
        <button onClick={this.handleFormSubmit} className="btn btn-dark">
          sign in
        </button>
      );
    } else if (this.props.signup.pin_status !== "success") {
      button = (
        <button onClick={this.handlePinSubmit} className="btn btn-dark">
          verify email
        </button>
      );
    }

    return (
      <div className="card mx-auto mt-5" style={{ maxWidth: "25rem" }}>
        <div className="card-header">Sign up</div>
        <div className="card-body">
          {this.props.signup.form_status !== "success" && (
            <form>
              <SignupInput
                name="username"
                placeholder="Username"
                onChange={this.handleChange}
                value={this.props.signup.username}
              />
              <SignupInput
                name="email"
                type="email"
                placeholder="Email Address"
                onChange={this.handleChange}
                value={this.props.signup.email}
              />
              <SignupInput
                name="password"
                type="password"
                placeholder="Password"
                onChange={this.handleChange}
                value={this.props.signup.password}
              />
            </form>
          )}
          {this.props.signup.pin_status !== "success" &&
            this.props.signup.form_status === "success" && (
              <form>
                <SignupInput
                  name="signup_pin"
                  placeholder="PIN"
                  onChange={this.handleChange}
                />
              </form>
            )}
          {error_message && <p className="text-danger">{error_message}</p>}
        </div>
        <div className="card-footer">{button}</div>
      </div>
    );
  }
}

class SignupInput extends Component {
  render() {
    return (
      <input
        id={this.props.name + "Input"}
        className="form-control mb-4"
        {...this.props}
      />
    );
  }
}

SignupCard.propTypes = {
  signup: PropTypes.exact({
    username: PropTypes.string,
    email: PropTypes.string,
    password: PropTypes.string,
    signup_pin: PropTypes.string,
    form_status: PropTypes.oneOf([
      "",
      "success",
      "password_invalid",
      "email_taken",
      "email_invalid",
      "username_taken",
      "username_invalid",
      "empty_fields"
    ]),
    pin_status: PropTypes.oneOf([
      "",
      "success",
      "signup_token_invalid",
      "signup_token_invalid_new_email_sent",
      "signup_token_expired"
    ]).isRequired
  })
};

SignupInput.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  type: PropTypes.oneOf(["text", "email", "password"]),
  onChange: PropTypes.func.isRequired
};

SignupInput.defaultProps = {
  type: "text"
};

const mapStateToProps = state => {
  return { ...state };
};

export default connect(mapStateToProps, {
  signupUpdateValues,
  signupSubmitForm,
  signupSubmitPin,
  signupEnd,
  userLogIn
})(SignupCard);
