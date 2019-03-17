import React, { Component } from "react";
import Display from "./components/Display";
import NumButton from "./components/NumButtons";
import ClearButton from "./components/ClearButton";
import OpsButton from "./components/OpButtons";
import "./App.css";

class App extends Component {
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
    return (
      <div className="App">
        <Display value={this.state.displayValues} />
        <ClearButton onClick={this.handleClear} />
        <OpsButton onClick={this.handleDelete} id="del" />
        <NumButton onClick={this.handleNumClick} id="7" />
        <NumButton onClick={this.handleNumClick} id="8" />
        <NumButton onClick={this.handleNumClick} id="9" />
        <OpsButton onClick={this.handleNumClick} id=" ÷ " />
        <NumButton onClick={this.handleNumClick} id="4" />
        <NumButton onClick={this.handleNumClick} id="5" />
        <NumButton onClick={this.handleNumClick} id="6" />
        <OpsButton onClick={this.handleNumClick} id=" × " />
        <NumButton onClick={this.handleNumClick} id="1" />
        <NumButton onClick={this.handleNumClick} id="2" />
        <NumButton onClick={this.handleNumClick} id="3" />
        <OpsButton onClick={this.handleNumClick} id=" - " />
        <OpsButton onClick={this.handleNumClick} id="." />
        <NumButton onClick={this.handleNumClick} id="0" />
        <OpsButton onClick={this.calculate} id="=" />
        <OpsButton onClick={this.handleNumClick} id=" + " />
      </div>
    );
  }
}

export default App;
