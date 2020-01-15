import React, { Component } from "react";
import axios from "axios";

export default class GetData extends Component {
  constructor() {
    super();
    this.state = {
      user: ""
    };
  }

  componentDidMount() {
    let params = new URLSearchParams();
    params.append("get", "account");
    params.append(
      "login_token",
      "asdasd-iQmUeYbCgBSp9MzXOj9PN6uGVmH6StObBExwpKlmwnJTCV13vqtccqy1uETZTzp9WBNl3gBlv3e88oANYM1L7sYqRN1MW4XyMjisCDYU0oND6yJfaEHlw19sPmtIjYHU"
    );
    axios
      .post("http://api.coilab.com/user", params)
      .then(res => console.log(res.data))
      .catch(err => console.log(err));
  }

  render() {
    return <div></div>;
  }
}
