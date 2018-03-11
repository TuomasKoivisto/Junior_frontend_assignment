import React, { Component } from 'react';
import './../App.css';

const iconStyle = {
  width: '20px',
  display: 'block'
};

var storedInputs = [];

class Inputs extends Component {
  constructor(props) {
    super(props);

    this.setDefaultValues();

    this.state = {
      startDate: storedInputs[0],
      endDate: storedInputs[1],
      accessToken: storedInputs[2]
    };
    this.onInputChange(
      this.state.startDate,
      this.state.endDate,
      this.state.accessToken
    );
  }

  setDefaultValues() {
    storedInputs = JSON.parse(localStorage.getItem('userInputs'));
    if (storedInputs[0] === undefined) {
      storedInputs[0] = '2017-05-01';
    }
    if (storedInputs[1] === undefined) {
      storedInputs[1] = '2017-06-15';
    }
    if (storedInputs[2] === undefined) {
      storedInputs[2] = '';
    }
  }

  onInputChange(startDate, endDate, accessToken) {
    this.props.httpRequest(startDate, endDate, accessToken);
    var inputs = [startDate, endDate, accessToken];
    localStorage.setItem('userInputs', JSON.stringify(inputs));
  }

  render() {
    return (
      <div className="row">
        <div className="col-sm-4">
          Start date
          <input
            type="date"
            value={this.state.startDate}
            onChange={event => {
              this.onInputChange(
                event.target.value,
                this.state.endDate,
                this.state.accessToken
              );
              this.setState({ startDate: event.target.value });
            }}
          />
        </div>
        <div className="col-sm-4">
          End date
          <input
            type="date"
            value={this.state.endDate}
            onChange={event => {
              this.onInputChange(
                this.state.startDate,
                event.target.value,
                this.state.accessToken
              );
              this.setState({ endDate: event.target.value });
            }}
          />
        </div>
        <div className="col-sm-4">
          <div>
            <img
              src={require('../images/user-icon.png')}
              alt=""
              style={iconStyle}
            />
            <input
              type="text"
              placeholder="Access Token"
              value={this.state.accessToken}
              onChange={event => {
                this.onInputChange(
                  this.state.startDate,
                  this.state.endDate,
                  event.target.value
                );
                this.setState({ accessToken: event.target.value });
              }}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Inputs;
