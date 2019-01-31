import React from 'react';
import axios from 'axios';
import Chart from './Chart.jsx'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      start: '2018-01-01',
      end: '2018-12-31'
    }
  }

  componentDidMount() {
    axios.get(`https://api.coindesk.com/v1/bpi/historical/close.json?start=${this.state.start}&end=${this.state.end}`)
    .then((resp) => {
      console.log(resp);
    })
    .catch((error) => {
      console.log('Error:  ', error)
    })
  }

  render () {
    return (
      <div>
        <Chart />
      </div>
    )
  }
}

export default App;