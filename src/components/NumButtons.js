import React, { Component } from "react";

class NumButton extends Component {
  render() {
    return (
      <div className="num-button">
        <p value={this.props.id} onClick={this.props.onClick}>
          {this.props.id}
        </p>
      </div>
    );
  }
}

export default NumButton;
