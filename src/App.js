import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import _ from 'lodash';

import Inputs from './components/inputs';
import Counters from './components/counters';
import Table from './components/table';
import Chart from './components/chart';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: '',
      endDate: '',
      accessToken: '',
      data: [],
      dataByDate: [],
      chartData: []
    };
  }

  sortByDate(array) {
    var sorted = array.sort(function(a, b) {
      return new Date(b.date) - new Date(a.date);
    });
    return sorted;
  }

  prepareTableData() {
    var days = [];
    var count = 1;
    days = _.map(this.state.data.by_date, day => {
      return {
        id: count++,
        conversations: day.conversation_count,
        missed_chats: day.missed_chat_count,
        visitor_conversations: day.visitors_with_chat_count,
        date: day.date
      };
    });
    this.setState({ dataByDate: days });
  }

  httpRequest(startDate, endDate, accessToken) {
    if (startDate && endDate && accessToken !== '') {
      var config = {
        headers: {
          Authorization: `Token ${accessToken}`,
          Accept: 'application/json'
        }
      };
      axios
        .get(
          `https://api.giosg.com/api/reporting/v1/rooms/84e0fefa-5675-11e7-a349-00163efdd8db/chat-stats/daily/?start_date=${startDate}&end_date=${endDate}`,
          config
        )
        .then(res => {
          this.setState({ data: res.data });
          this.setState({ chartData: this.sortByDate(res.data.by_date) });
          this.prepareTableData();
        });
    }
  }

  render() {
    return (
      <div className="App">
        <header>
          <h1>Frontend Assignment</h1>
        </header>
        <main className="container">
          <Inputs
            httpRequest={(startDate, EndDate, accessToken) =>
              this.httpRequest(startDate, EndDate, accessToken)
            }
          />
          <div className="gap" />
          <Counters data={this.state.data} />
          <div className="gap" />
          <Table dataByDate={this.state.dataByDate} />
          <Chart data={this.state.chartData} />
        </main>
      </div>
    );
  }
}

export default App;
