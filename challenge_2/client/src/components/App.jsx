import React from 'react';
import axios from 'axios';
import Chart from './Chart.jsx';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      start: '2018-01-01',
      end: '2018-12-31',
      dataPoints: []
    }
  }

  componentDidMount() {
    axios.get(`https://api.coindesk.com/v1/bpi/historical/close.json?start=${this.state.start}&end=${this.state.end}`)
    .then((resp) => {
      let current = this.state.start.slice(5,7);
      let monthData = [];
      let accumulator = [];
      let respData = resp.data.bpi;
      for (var key in respData) {
        let newKey = key.slice(5,7);
        if (current === newKey) {
          accumulator.push(respData[key]);
        }
        if (current !== newKey) {
          current = newKey;
          accumulator = accumulator.reduce((acc, curVal) => (acc + curVal)/accumulator.length);
          monthData.push(accumulator);
          accumulator = [];
        }
      }
      accumulator = accumulator.reduce((acc, curVal) => (acc + curVal)/accumulator.length);
      monthData.push(accumulator);
      return monthData;
    })
    .then((finalData) => {
      this.setState({
        dataPoints: finalData
      });
    })
    .catch((error) => {
      console.log('Error:  ', error);
    });
  }

  render () {
    if (this.state.dataPoints.length > 0) {
      return (
        <div>
          <Chart data={this.state.dataPoints}/>
        </div>
      )
    } else {
      return (
        <div>

        </div>
      )
    }
  }
}

export default App;