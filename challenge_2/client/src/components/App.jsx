import React from 'react';
import axios from 'axios';


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      start: '2018-01-01',
      end: '2018-12-31'
    }
  }

  componentDidMount() {
    axios.get(`https://api.coindesk.com/v1/bpi/currentprice.json?start=${this.state.start}&end=${this.state.end}`)
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
        Hello
      </div>
    )
  }
}

export default App;