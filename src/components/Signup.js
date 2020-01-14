import React, { Component } from "react";
import axios from "axios";

export default class Signup extends Component {
  render() {
    return <SignupCard onSubmit={this.handleSubmit} />;
  }
}

class SignupCard extends Component {
  constructor(props) {
    super(props);
    this.state = { email: "", username: "", password: "" };
  }
  handleSubmit = () => {
    let form = new URLSearchParams();
    form.append("signup", "true");
    form.append("username", this.state.username);
    form.append("email", this.state.email);
    form.append("password", this.state.password);
    axios
      .post("http://api.coilab.com/user", form)
      .then(res => console.log(res.data));
  };
  handleEmailChange = e => {
    this.setState({ email: e.target.value });
  };
  handleUsernameChange = e => {
    this.setState({ username: e.target.value });
  };
  handlePasswordChange = e => {
    this.setState({ password: e.target.value });
  };

  render() {
    return (
      <div className="card mx-auto mt-5" style={{ maxWidth: "25rem" }}>
        <div className="card-header">Sign up</div>
        <div className="card-body">
          <form>
            <input
              placeholder="Username"
              type="text"
              className="form-control mb-4"
              id="UsernameInput"
              onChange={this.handleUsernameChange}
            />
            <input
              placeholder="Email Address"
              type="email"
              className="form-control mb-4"
              id="EmailInput"
              onChange={this.handleEmailChange}
            />
            <input
              placeholder="Password"
              type="password"
              className="form-control mb-4"
              id="PasswordInput"
              onChange={this.handlePasswordChange}
            />
          </form>
        </div>
        <div className="card-footer">
          <button onClick={this.handleSubmit} className="btn btn-dark">
            Sign up
          </button>
        </div>
      </div>
    );
  }
}
