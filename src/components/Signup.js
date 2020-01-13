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
      <div className="card mx-auto container mt-5">
        <div className="card-body">
          <form>
            <FormGroup
              label="username"
              type="text"
              className="form-control"
              id="UsernameInput"
              handleChange={this.handleUsernameChange}
            />
            <FormGroup
              label="email address"
              type="email"
              className="form-control"
              id="EmailInput"
              handleChange={this.handleEmailChange}
            />
            <FormGroup
              label="password"
              type="password"
              className="form-control"
              id="PasswordInput"
              handleChange={this.handlePasswordChange}
            />
          </form>
          <button onClick={this.handleSubmit} className="btn btn-dark">
            Submit
          </button>
        </div>
      </div>
    );
  }
}

class FormGroup extends Component {
  render() {
    return (
      <div className="form-group">
        {this.props.label && <label>{this.props.label}</label>}
        <input
          className="form-control"
          type={this.props.type}
          onChange={this.props.handleChange}
          id={this.props.id}
        />
        {this.props.small && (
          <small className="form-text text-muted">{this.props.small}</small>
        )}
        {this.props.children}
      </div>
    );
  }
}
