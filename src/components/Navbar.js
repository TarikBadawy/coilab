import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Logout from "./Logout";

class Navbar extends Component {
  render() {
    let userIsNotLoggedInButton = (
      <>
        <Link to="login">
          <button className="btn btn-outline-dark mr-2">Log In</button>
        </Link>
        <Link to="signup">
          <button className="btn btn-outline-dark">Sign Up</button>
        </Link>
      </>
    );

    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link className="navbar-brand" to="/">
          coilab
        </Link>
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">Workspace</li>
        </ul>
        {this.props.username === "" ? userIsNotLoggedInButton : <Logout />}
      </nav>
    );
  }
}

Navbar.defaultProps = {
  username: "",
  email: ""
};

const mapStateToProps = state => ({
  username: state.user.username,
  email: state.user.email
});

export default connect(mapStateToProps)(Navbar);
