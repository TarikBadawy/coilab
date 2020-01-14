import React, { Component } from "react";
import axios from "axios";

export default class Login extends Component {
  constructor() {
    super();
    this.state = { username_or_email: "", password: "" };
  }
  handleSubmit = () => {
    let form = new URLSearchParams();
    let url = "http://api.coilab.com/user";
    form.append("login", "true");
    form.append("username_or_email", this.state.username_or_email);
    form.append("password", this.state.password);
    axios
      .post(url, form)
      .then(res => console.log(res.data))
      .catch(err => console.log(err));
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
        <button onClick={this.handleSubmit} className="btn btn-dark">
          Log in
        </button>
      </React.Fragment>
    );
  }
}
