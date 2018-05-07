import React, { Component } from 'react';
import { Button, ButtonGroup } from 'reactstrap';

class Checkbox extends Component {
  constructor (props) {
    super(props);

    this.state = { cSelected: [] };

    this.onRadioBtnClick = this.onRadioBtnClick.bind(this);
    
  }

  onRadioBtnClick(rSelected) {
    this.setState({ rSelected });
  }
  render() {
    return (
      <div>
        <h5>Employee role</h5>
        <ButtonGroup>
          <Button color="primary" onClick={() => this.onRadioBtnClick("Host")} active={this.state.rSelected === "Host"}>Host</Button>
          <Button color="primary" onClick={() => this.onRadioBtnClick("Waiter")} active={this.state.rSelected === "Waiter"}>Waiter</Button>
        </ButtonGroup>
        <p>Selected: {this.state.rSelected}</p>
      </div>
    );
  }
}

export default Checkbox;
