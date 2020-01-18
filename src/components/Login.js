import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { userLogIn, userLogOut } from "../redux/actions/userActions";
import { connect } from "react-redux";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username_or_email: "",
      password: ""
    };
  }

  handleLogIn = () => {
    this.props.userLogIn(this.state.username_or_email, this.state.password);
  };
  handleLogOut = () => {
    this.props.userLogIn(this.props.auth_token);
  };
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    if (this.props.auth_token) {
      return <Redirect to="/" />;
    }

    let login_content = (
      <>
        <form>
          <input
            type="text"
            placeholder="Email / Username"
            className="form-control mb-4"
            id="login_password"
            name="username_or_email"
            value={this.state.username_or_email}
            onChange={this.handleChange}
          />
          <input
            type="password"
            placeholder="Password"
            className=" form-control mb-3"
            id="password"
            name="password"
            value={this.state.password}
            onChange={this.handleChange}
          />
          <button
            type="button"
            onClick={this.handleLogIn}
            className="btn btn-dark"
          >
            Log in
          </button>
        </form>
      </>
    );

    let logout_content = (
      <>
        <h4 className="text-center m-0">You are already logged in.</h4>
        <button onClick={this.handleLogOut} className="btn btn-dark">
          Log out
        </button>
      </>
    );

    let error_paragraph = (
      <p className="text-danger">{this.props.error_message}</p>
    );

    return (
      <>
        <div className="card mx-auto mt-5" style={{ maxWidth: "25rem" }}>
          <div className="card-header">Log in</div>
          <div className="card-body">
            {this.props.error_message && error_paragraph}
            {this.props.auth_token ? logout_content : login_content}
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth_token: state.user.auth_token,
    logout_status: state.user.logout_status,
    error_message: state.error.error_message
  };
};

export default connect(mapStateToProps, { userLogIn, userLogOut })(Login);
