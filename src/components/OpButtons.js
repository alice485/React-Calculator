import React, { Component } from "react";

class OpsButton extends Component {
  render() {
    return (
      <div className="ops-button">
        <p value={this.props.id} onClick={this.props.onClick}>
          {this.props.id}
        </p>
      </div>
    );
  }
}

export default OpsButton;
