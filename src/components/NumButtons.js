import React, { Component } from "react";

class NumButton extends Component {
  render() {
    return (
      <div className="num-button">
        <p value={this.props.value} onClick={this.props.onClick}>
          {this.props.value}
        </p>
      </div>
    );
  }
}

export default NumButton;
