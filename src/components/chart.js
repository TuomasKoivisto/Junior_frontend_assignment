import React, { Component } from 'react';
import { BarChart } from 'react-easy-chart';
import _ from 'lodash';

const tooltip = {
  fontSize: '16px'
};

class Chart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      windowWidth: window.innerWidth,
      showToolTip: false,
      top: '',
      left: '',
      y: '',
      x: ''
    };
  }
  resize = () => {
    this.setState({
      windowWidth: document.getElementById('chartContainer').offsetWidth
    });
  };

  componentDidMount() {
    window.addEventListener('resize', this.resize);
    this.resize();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
  }
  mouseOverHandler(d, e) {
    this.setState({
      showToolTip: true,
      top: `${e.screenY - 10}px`,
      left: `${e.screenX + 10}px`,
      y: d.y,
      x: d.x
    });
  }

  mouseMoveHandler(e) {
    if (this.state.showToolTip) {
      this.setState({ top: `${e.y - 10}px`, left: `${e.x + 10}px` });
    }
  }

  mouseOutHandler() {
    this.setState({ showToolTip: false });
  }
  render() {
    var days = [];
    days = _.map(this.props.data, day => {
      return {
        x: day.date,
        y: day.conversation_count
      };
    });
    return (
      <div id="chartContainer">
        <h2 style={tooltip}>
          {this.state.y}
          {this.state.y === '' ? 'mouse over the chart' : ' conversations in '}
          {this.state.x}
        </h2>
        <BarChart
          height={200}
          width={this.state.windowWidth}
          data={days}
          mouseOverHandler={this.mouseOverHandler.bind(this)}
          mouseOutHandler={this.mouseOutHandler.bind(this)}
          mouseMoveHandler={this.mouseMoveHandler.bind(this)}
        />
      </div>
    );
  }
}

export default Chart;
