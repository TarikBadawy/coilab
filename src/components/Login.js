import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { userLogIn } from "../redux/actions/userActions";
import { connect } from "react-redux";
import $ from "jquery";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username_or_email: "",
      password: ""
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

  handleLogIn = () => {
    this.props.userLogIn(this.state.username_or_email, this.state.password);
  };
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    if (this.props.auth_token) {
      return <Redirect to="/" />;
    }

    let error_paragraph = (
      <p className="text-danger">{this.props.error_message}</p>
    );

    return (
      <>
        <div className="card mx-auto mt-5" style={{ maxWidth: "25rem" }}>
          <div className="card-header">Log in</div>
          <div className="card-body">
            {this.props.error_message && error_paragraph}
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

export default connect(mapStateToProps, { userLogIn })(Login);
