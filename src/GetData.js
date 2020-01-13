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
    // axios
    //   .get("http://api.coilab.com/user/?id=1", { responseType: "json" })
    //   .then(res => console.log(res.data));

    let params = new URLSearchParams();
    params.append("signup", "true");
    params.append("username", "Deo");
    params.append("email", "Deo@Doe.kys");
    params.append("password", "123456789");
    axios
      .post("http://api.coilab.com/user", params)
      .then(res => console.log(res.data))
      .catch(err => console.log(err));
  }

  render() {
    return <div></div>;
  }
}
