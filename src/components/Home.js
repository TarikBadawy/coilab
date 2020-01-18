import React, { Component } from "react";
import { connect } from "react-redux";

class HomePage extends Component {
  componentDidMount() {
    if (this.props.auth_token) {
      //Verify login
    } else {
      //nothing
    }
  }

  render() {
    let default_content = (
      <section className="jumbotron text-center">
        <div className="container">
          <h1>
            This bullshitty standtart motivational text and shit - "Van Rectum"
          </h1>
          <p className="lead text-muted">
            Lorem fucksum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
            erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
            et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est
            Lorem fucksum dolor sit amet.
          </p>
        </div>
      </section>
    );

    let logged_in_content = (
      <h1 className="text-center">Welcome back {this.props.username}</h1>
    );

    return <>{this.props.auth_token ? logged_in_content : default_content}</>;
  }
}

const mapStateToProps = state => {
  return { ...state.user };
};

export default connect(mapStateToProps)(HomePage);
