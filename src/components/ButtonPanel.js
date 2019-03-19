import React, { Component, Fragment } from "react";
import Display from "./Display";
import NumButton from "./NumButtons";
import ClearButton from "./ClearButton";
import OpsButton from "./OpButtons";

class ButtonPanel extends Component {
  constructor(props) {
    super(props);
    this.state = { displayValues: "" };
  }

  handleNumClick = e => {
    let currentValue = this.state.displayValues;
    this.setState(
      { displayValues: (currentValue += e.target.getAttribute("value")) },
      () => {
        console.log(this.state);
      }
    );
  };
  checkForDivMult(values) {
    for (let i = 0; i < values.length; i++) {
      if (values[i] === "×") {
        let replacement = values[i - 1] * values[i + 1];
        values.splice(i - 1, 3, replacement);
      }
      if (values[i] === "÷") {
        let replacement = values[i - 1] / values[i + 1];
        values.splice(i - 1, 3, replacement);
      }
    }
  }
  doAddSubtract = values => {
    let result = null;
    for (let i = 0; i < values.length; i++) {
      if (values[i] === "+") {
        if (result === null) {
          result = values[i - 1] + values[i + 1];
        } else {
          result = result + values[i + 1];
        }
      } else if (values[i] === "-") {
        if (result === null) {
          result = values[i - 1] - values[i + 1];
        } else {
          result = result - values[i + 1];
        }
      }
    }
    this.setState({ displayValues: result }, () =>
      console.log(this.state.displayValues)
    );
  };
  handleDelete = e => {
    let toDeleteFrom = String(this.state.displayValues);
    let afterDeletion = toDeleteFrom.slice(0, -1);
    this.setState({ displayValues: afterDeletion }, () =>
      console.log(this.state)
    );
  };
  handleClear = e => {
    this.setState({ displayValues: "" }, () => console.log(this.state));
  };
  calculate = e => {
    if (
      typeof this.state.displayValues === "number" ||
      this.state.displayValues === ""
    ) {
      return;
    }
    let values = this.state.displayValues;
    values = values.split(" ");
    for (let i = 0; i < values.length; i++) {
      if (i % 2 === 0) {
        values[i] = Number(values[i]);
      }
    }

    console.log(values);
    this.checkForDivMult(values);
    this.checkForDivMult(values);

    if (values.length === 1) {
      console.log(values);
      this.setState({ displayValues: values[0] }, () =>
        console.log(this.state)
      );
      return;
    }

    this.doAddSubtract(values);
  };

  render() {
    let nums = [7, 8, 9, 4, 5, 6, 1, 2, 3, 0];
    nums = nums.map(num => (
      <NumButton onClick={this.handleNumClick} value={num} key = {num} />
    ));
    return (
      <Fragment>
        <Display value={this.state.displayValues} />
        <ClearButton onClick={this.handleClear} />
        <OpsButton onClick={this.handleDelete} value="del" />
        <Fragment>{nums.slice(0, 3)}</Fragment>
        <OpsButton onClick={this.handleNumClick} value=" ÷ " />
        <Fragment>{nums.slice(3, 6)}</Fragment>
        <OpsButton onClick={this.handleNumClick} value=" × " />
        <Fragment>{nums.slice(6, 9)}</Fragment>
        <OpsButton onClick={this.handleNumClick} value=" - " />
        <OpsButton onClick={this.handleNumClick} value="." />
        <Fragment>{nums.slice(9)}</Fragment>
        <OpsButton onClick={this.calculate} value="=" id = "equals" />
        <OpsButton onClick={this.handleNumClick} value=" + " />
      </Fragment>
    );
  }
}

export default ButtonPanel;
