import React, { Component } from 'react';

const inline = {
  padding: '3px 0',
  border: '1px solid rgb(200,200,200)',
  textAlign: 'center'
};

const large = {
  fontSize: '25px',
  fontWeight: 'large'
};

class Counters extends Component {
  render() {
    return (
      <div className="row">
        <div className="col-sm-4" style={inline}>
          <div style={large}>{this.props.data.total_conversation_count}</div>
          <p>Total conversation count</p>
        </div>
        <div className="col-sm-4" style={inline}>
          <div style={large}>{this.props.data.total_user_message_count}</div>
          <p>Total user message count</p>
        </div>
        <div className="col-sm-4" style={inline}>
          <div style={large}>{this.props.data.total_visitor_message_count}</div>
          <p>Total visitor message count</p>
        </div>
      </div>
    );
  }
}

export default Counters;
