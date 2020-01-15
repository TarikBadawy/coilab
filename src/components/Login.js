import React, { Component } from "react";
import axios from "axios";
import { userLogIn } from "../redux/actions/userActions";
import { connect } from "react-redux";

class Login extends Component {
  handleLogIn = () => {
    let request = new URLSearchParams({
      login: true,
      username_or_email: this.props.username_or_email,
      password: this.props.password,
    });
    axios
      .post("http://api.coilab.com/user", request)
      .then(res => res.data)
      .then(data => {
        if (data.status === "success") {
          let user = { name: data.username, email: data.email };
          let token = data.login_token;
          this.props.userLogIn(user, token);
        } else {
          console.error(data.status + " login failed");
        }
      });
  };
  handleUsernameOrEmailChange = e => {
    this.setState({ username_or_email: e.target.value });
  };
  handlePasswordChange = e => {
    this.setState({ password: e.target.value });
  };

  render() {
    return (
      <React.Fragment>
        <form className="nav-item form-inline">
          <div className="form-group">
            <input
              type="text"
              placeholder="Email / Username"
              className="form-control mr-2"
              id="login_password"
              onChange={this.handleUsernameOrEmailChange}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              className="form-control mr-2"
              id="login_username_or_email"
              onChange={this.handlePasswordChange}
            />
          </div>
        </form>
        <button onClick={this.handleLogIn} className="btn btn-dark">
          Log in
        </button>
      </React.Fragment>
    );
  }
}

export default connect(null, { userLogIn })(Login);
