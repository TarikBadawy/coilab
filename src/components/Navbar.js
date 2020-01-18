import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { userLogOut } from "../redux/actions/userActions";

class Navbar extends Component {
  handleLogOut = e => {
    e.preventDefault();
    this.props.userLogOut(this.props.auth_token);
  };

  render() {
    let login_button = (
      <Link to="login">
        <button className="btn btn-outline-dark mr-2">Log In</button>
      </Link>
    );

    let signup_button = (
      <Link to="signup">
        <button className="btn btn-outline-dark">Sign Up</button>
      </Link>
    );

    let logout_button = (
      <button onClick={this.handleLogOut} className="btn btn-dark">
        Log out
      </button>
    );

    let user_features = (
      <>
        <li className="nav-item">
          <Link className="nav-link" to="workspace">
            Workspace
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="math">
            Math
          </Link>
        </li>
      </>
    );

    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link className="navbar-brand" to="/">
          coilab
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarElements"
          aria-controls="navbarElements"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarElements">
          <ul className="navbar-nav mr-auto">
            {this.props.auth_token && user_features}
          </ul>
          {this.props.auth_token && logout_button}
          {!this.props.auth_token && login_button}
          {!this.props.auth_token && signup_button}
        </div>
      </nav>
    );
  }
}

Navbar.defaultProps = {
  username: "",
  email: ""
};

const mapStateToProps = state => ({ ...state.user });

export default connect(mapStateToProps, { userLogOut })(Navbar);
