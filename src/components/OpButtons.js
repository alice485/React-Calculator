import React, { Component } from "react";

class OpsButton extends Component {
  render() {
    let opsClassName = this.props.value === "." || this.props.value === "=" ? "decimalAndEquals":"ops-button";
    return (
      <div className={opsClassName}>
        <p value={this.props.value} onClick={this.props.onClick}>
          {this.props.value}
        </p>
      </div>
    );
  }
}

export default OpsButton;
