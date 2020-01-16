import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { userLogIn, userLogOut } from "../redux/actions/userActions";
import { connect } from "react-redux";
import Navbar from "./Navbar";

class Login extends Component {
  handleLogIn = () => {
    this.props.userLogIn(this.state.username_or_email, this.props.password);
  };
  handleLogOut = () => {
    this.props.userLogIn(this.props.login_token);
  };
  handleUsernameOrEmailChange = e => {
    this.setState({ username_or_email: e.target.value });
  };
  handlePasswordChange = e => {
    this.setState({ password: e.target.value });
  };

  render() {
    if (this.props.logout_status === "success") {
      return <Redirect to="/" />;
    }

    let is_logged_in = this.props.login_token !== "";
    let login_body = (
      <>
        <form className="nav-item form-inline">
          <div className="form-group">
            <input
              type="text"
              placeholder="Email / Username"
              className="form-control mb-4"
              id="login_password"
              onChange={this.handleUsernameOrEmailChange}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              className="form-control"
              id="login_username_or_email"
              onChange={this.handlePasswordChange}
            />
          </div>
        </form>
      </>
    );

    let login_footer = (
      <button onClick={this.handleLogIn} className="btn btn-dark">
        Log in
      </button>
    );

    let logout_body = <h3>You are already logged in</h3>;

    let logout_footer = (
      <button onClick={this.handleLogOut} className="btn btn-dark">
        Log out
      </button>
    );

    return (
      <>
        <Navbar />
        <div className="card mx-auto mt-5" style={{ maxWidth: "25rem" }}>
          <div className="card-header">Log in</div>
          <div className="card-body">
            {is_logged_in ? logout_body : login_body}
          </div>
          <div className="card-footer">
            {is_logged_in ? logout_footer : login_footer}
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    login_token: state.user.login_token,
    logout_status: state.user.logout_status
  };
};

export default connect(mapStateToProps, { userLogIn, userLogOut })(Login);
