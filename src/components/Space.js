import React, { Component } from "react";
import { connect } from "react-redux";

class Space extends Component {
  render() {
    return (
      <>
        <h1 className="text-center">Welcome back {this.props.user.username}</h1>
      </>
    );
  }
}

const mapStateToProps = state => {
  return { ...state };
};

export default connect(mapStateToProps)(Space);
