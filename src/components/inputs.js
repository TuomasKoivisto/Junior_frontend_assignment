import React, { Component } from 'react';
import './../App.css';

const iconStyle = {
  width: '20px',
  display: 'block'
};


class Inputs extends Component {
  constructor(props) {
    super(props);

    var storedInputs = [];
    storedInputs = JSON.parse(localStorage.getItem('userInputs'));

    this.state = {
      startDate: storedInputs ? storedInputs[0] : '2017-05-01',
      endDate: storedInputs ? storedInputs[1]  :  '2017-06-15',
      accessToken: storedInputs ? storedInputs[2] : ''
    };
    this.onInputChange(
      this.state.startDate,
      this.state.endDate,
      this.state.accessToken
    );
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
