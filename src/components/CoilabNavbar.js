import React, { Component } from "react";
import { Link } from "react-router-dom";
import Login from "./Login";

export default class CoilabNavbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <ul className="navbar-nav mr-auto">
          <Link className="navbar-brand" to="/">
            coilab
          </Link>
        </ul>
        <Login />
      </nav>
    );
  }
}

/* <Form inline>
  <Form.Control class="mr-4" type="email" placeholder="Enter email" />
  <Form.Control type="password" placeholder="Password" />
</Form>
<Button variant="dark" type="submit">
            Submit
          </Button> */
