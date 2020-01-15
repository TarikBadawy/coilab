import React, { Component } from "react";
//import axios from "axios";
import { userLogOut } from "../redux/actions/userActions";
import { connect } from "react-redux";

class Login extends Component {
  handleLogOut = () => {
    this.props.userLogOut(this.props.token);
  };

  render() {
    return (
      <button onClick={this.handleLogOut} className="btn btn-dark">
        Log out
      </button>
    );
  }
}

const mapStateToProps = state => ({
  token: state.user.token
});

export default connect(mapStateToProps, { userLogOut })(Login);
