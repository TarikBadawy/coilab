import React, { Component } from "react";
import Navbar from "./Navbar";
import { connect } from "react-redux";
import Space from "./Space";

class HomePage extends Component {
  componentDidMount() {
    if (this.props.user.login_token !== "success") {
      //Verify login
    } else {
      //nothing
    }
  }

  render() {
    let content = undefined;
    if (this.props.user.login_status === "success") {
      content = <Space />;
    } else {
      content = (
        <section className="jumbotron text-center">
          <div className="container">
            <h1>
              This bullshitty standtart motivational text and shit - "Van
              Rectum"
            </h1>
            <p className="lead text-muted">
              Lorem fucksum dolor sit amet, consetetur sadipscing elitr, sed
              diam nonumy eirmod tempor invidunt ut labore et dolore magna
              aliquyam erat, sed diam voluptua. At vero eos et accusam et justo
              duo dolores et ea rebum. Stet clita kasd gubergren, no sea
              takimata sanctus est Lorem fucksum dolor sit amet.
            </p>
          </div>
        </section>
      );
    }

    return (
      <>
        <Navbar />
        {content}
      </>
    );
  }
}

const mapStateToProps = state => {
  return { ...state };
};

export default connect(mapStateToProps)(HomePage);
