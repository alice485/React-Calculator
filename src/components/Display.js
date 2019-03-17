import React, { Component } from "react";

class Display extends Component {
  render() {
    return (
      <div className="display">
        <p>{this.props.value}</p>
      </div>
    );
  }
}

export default Display;
