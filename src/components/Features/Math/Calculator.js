import React, { Component } from "react";
import "../../../css/calculator.css";

export default class Calculator extends Component {
  render() {
    return (
      <div className="row mx-auto" style={{ maxWidth: "260px" }}>
        <div className="col btn btn-secondary">AC</div>
        <div className="col btn btn-secondary">+/-</div>
        <div className="col btn btn-secondary">%</div>
        <div className="col btn btn-primary">÷</div>
        <div className="w-100"></div>
        <div className="col btn btn-dark">7</div>
        <div className="col btn btn-dark">8</div>
        <div className="col btn btn-dark">9</div>
        <div className="col btn btn-primary">x</div>
        <div className="w-100"></div>
        <div className="col btn btn-dark">4</div>
        <div className="col btn btn-dark">5</div>
        <div className="col btn btn-dark">6</div>
        <div className="col btn btn-primary">-</div>
        <div className="w-100"></div>
        <div className="col btn btn-dark">1</div>
        <div className="col btn btn-dark">2</div>
        <div className="col btn btn-dark">3</div>
        <div className="col btn btn-primary">+</div>
        <div className="w-100"></div>
        <div className="col btn btn-dark">copy</div>
        <div className="col btn btn-dark">0</div>
        <div className="col btn btn-dark">,</div>
        <div className="col btn btn-primary">=</div>
      </div>
    );
  }
}
