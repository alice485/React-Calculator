import React, { Component } from "react";

class ClearButton extends Component {
  render() {
    return (
      <div className="clear">
        <p onClick={this.props.onClick}>Clear</p>
      </div>
    );
  }
}

export default ClearButton;
