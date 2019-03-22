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

  /*this.state.displayValues is a string value
    sets this.state.displayValues equal to the value attribute of the button pressed*/
  handleButtonClick = e => {
    let currentValue = this.state.displayValues;
    this.setState(
      { displayValues: (currentValue += e.target.getAttribute("value")) },
      () => {
        console.log(this.state);
      }
    );
  };

  //runs through a list of operations, performing any multiplication or division it finds
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

  //runs through list of operations performing any addition or subtraction it finds
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
    //sets the state to the result once all operations are calculated
    this.setState({ displayValues: result }, () =>
      console.log(this.state.displayValues)
    );
  };

  //deletes the last character from the display i.e., the state
  handleDelete = () => {
    let toDeleteFrom = String(this.state.displayValues);
    let afterDeletion = toDeleteFrom.slice(0, -1);
    this.setState({ displayValues: afterDeletion }, () =>
      console.log(this.state)
    );
  };

  //clears the display i.e., the state
  handleClear = () => {
    this.setState({ displayValues: "" }, () => console.log(this.state));
  };

  //main calculation function; runs when you press "=" button
  //does nothing if the display is blank or has only one number on it
  calculate = () => {
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
    let ops = ["del", " ÷ ", " × ", " - ", ".", "=", " + "];
    nums = nums.map(num => (
      <NumButton onClick={this.handleButtonClick} value={num} key={num} />
    ));
    ops = ops.map(op => {
      let action;
      if (op === "del") {
        action = this.handleDelete;
      } else if (op === "=") {
        action = this.calculate;
      } else {
        action = this.handleButtonClick;
      }
      return <OpsButton onClick={action} value={op} key={op} />;
    });
    return (
      <Fragment>
        <Display value={this.state.displayValues} />
        <ClearButton onClick={this.handleClear} />
        <Fragment>{ops.slice(0, 1)}</Fragment>
        <Fragment>{nums.slice(0, 3)}</Fragment>
        <Fragment>{ops.slice(1, 2)}</Fragment>
        <Fragment>{nums.slice(3, 6)}</Fragment>
        <Fragment>{ops.slice(2, 3)}</Fragment>
        <Fragment>{nums.slice(6, 9)}</Fragment>
        <Fragment>{ops.slice(3, 5)}</Fragment>
        <Fragment>{nums.slice(9)}</Fragment>
        <Fragment>{ops.slice(5)}</Fragment>
      </Fragment>
    );
  }
}

export default ButtonPanel;
