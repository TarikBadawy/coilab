import React, { Component } from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { userLogIn } from "../redux/actions/userActions";
import { ERRMSG } from "../redux/actions/types";
import axios from "axios";
import $ from "jquery";

export class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
      verification_code: "",
      signup_completed: false,
      verification_completed: false,
      error: undefined
    };
  }

  componentDidMount() {
    $(document).ready(function() {
      $(document.body).keypress(function(event) {
        if (event.keyCode === 13) $("#submit_button").click();
      });
    });
  }

  componentWillUnmount() {
    $(document.body).unbind();
  }

  handle_change = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  handle_signup_form_submit = () => {
    let request = new URLSearchParams({
      signup: true,
      username: this.state.username,
      email: this.state.email,
      password: this.state.password
    });
    axios
      .post("http://api.coilab.com/user", request)
      .then(res => res.data.status)
      .then(status => {
        status === "success"
          ? this.setState({ signup_completed: true, error: undefined })
          : this.setState({ error: ERRMSG[status] });
      })
      .catch(err => console.log(err));
  };

  handle_verification_form_submit = () => {
    let request = new URLSearchParams({
      signup_token_verification: true,
      username: this.state.username,
      signup_token: this.state.verification_code
    });
    axios
      .post("http://api.coilab.com/user", request)
      .then(res => res.data.status)
      .then(status => {
        status === "success"
          ? this.setState({
              verification_completed: true,
              error: undefined
            })
          : this.setState({ error: ERRMSG[status] });
      });
  };

  componentDidUpdate() {
    if (this.state.signup_completed && this.state.verification_completed) {
      this.props.userLogIn(this.state.email, this.state.password);
    }
  }

  render() {
    let redirect = <Redirect to="/" />;

    let signup_form = (
      <SignupForm
        handle_change={this.handle_change}
        handle_signup_form_submit={this.handle_signup_form_submit}
        error={this.state.error}
        username={this.state.username}
        email={this.state.email}
        password={this.state.password}
      />
    );

    let verification_form = (
      <VerificationForm
        handle_change={this.handle_change}
        handle_verification_form_submit={this.handle_verification_form_submit}
        error={this.state.error}
        verification_code={this.state.verification_code}
      />
    );

    let edge_case = <div>something went wrong</div>;

    return this.props.auth_token
      ? redirect
      : !this.state.signup_completed
      ? signup_form
      : !this.state.verification_completed
      ? verification_form
      : edge_case;
  }
}

class SignupForm extends Component {
  render() {
    return (
      <FormCard header="Sign up">
        {this.props.error && <p className="text-danger">{this.props.error}</p>}
        <form>
          <input
            className="form-control mb-4"
            type="text"
            id="username"
            placeholder="Username"
            onChange={this.props.handle_change}
            value={this.props.username}
          />
          <input
            className="form-control mb-4"
            type="email"
            id="email"
            placeholder="Email Address"
            onChange={this.props.handle_change}
            value={this.props.email}
          />
          <input
            className="form-control mb-4"
            type="password"
            id="password"
            placeholder="Password"
            onChange={this.props.handle_change}
            value={this.props.password}
          />
          <button
            id="submit_button"
            className="btn btn-dark"
            type="button"
            onClick={this.props.handle_signup_form_submit}
          >
            Sign Up
          </button>
        </form>
      </FormCard>
    );
  }
}

class VerificationForm extends Component {
  render() {
    return (
      <FormCard header="Verification">
        {this.props.error && <p className="text-danger">{this.props.error}</p>}
        <form>
          <p>
            We have sent you a confirmation code. Please enter the code in the
            field below.
          </p>
          <input
            className="form-control mb-4"
            type="text"
            id="verification_code"
            placeholder="Code"
            onChange={this.props.handle_change}
            value={this.props.verification_code}
          />
          <button
            id="submit_button"
            className="btn btn-dark"
            type="button"
            onClick={this.props.handle_verification_form_submit}
          >
            verify email
          </button>
        </form>
      </FormCard>
    );
  }
}

class FormCard extends Component {
  render() {
    return (
      <div className="card mx-auto mt-5" style={{ maxWidth: "25rem" }}>
        <div className="card-header">{this.props.header}</div>
        <div className="card-body">{this.props.children}</div>
      </div>
    );
  }
}

Signup.propTypes = {
  userLogIn: PropTypes.func.isRequired,
  auth_token: PropTypes.string
};

SignupForm.propTypes = {
  error: PropTypes.string,
  handle_change: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  handle_signup_form_submit: PropTypes.func.isRequired
};

VerificationForm.propTypes = {
  error: PropTypes.string,
  handle_change: PropTypes.func.isRequired,
  verification_code: PropTypes.string.isRequired,
  handle_verification_form_submit: PropTypes.func.isRequired
};

FormCard.propTypes = {
  header: PropTypes.node.isRequired,
  children: PropTypes.node.isRequired
};

const mapStateToProps = state => {
  return {
    auth_token: state.user.auth_token,
    error_message: state.error.error_message
  };
};

export default connect(mapStateToProps, { userLogIn })(Signup);
