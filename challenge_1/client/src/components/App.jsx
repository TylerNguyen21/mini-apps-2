import React from 'react';
import axios from 'axios';
import Event from './Event.jsx';
import ReactPaginate from 'react-paginate';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      events: [],
      searchBarEntry: '',
      pageCount: 0,
      pageNumber: 0
    }
    this.search = this.search.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);
  }

  componentDidMount () {
    axios.get(`/events?_page=${this.state.pageNumber}&_limit=10`)
    .then((resp) => {
      console.log(resp)
      let info = resp.data
      let pageAmount = Math.ceil(resp.headers['x-total-count']/ resp.data.length)
      this.setState({
        events: info,
        pageCount: pageAmount
      })
    })
  }

  search() {
    axios.get(`/events?_page=${this.state.pageNumber}&_limit=10&q=${this.state.searchBarEntry}`)
    .then((resp) => {
      let info = resp.data
      this.setState({
        events: info
      })
    })
  }

  handleInput (e) {
    let change = {}
    change[e.target.name] = e.target.value
    this.setState(change)
  }

  handlePageClick (e) {
    let page = e.selected + 1
    this.setState({
      pageNumber: page
    }, () => this.search())
  }

  render () {
    return (
      <div>
        <div className="search-container">
          <form onSubmit={(e) => {e.preventDefault(); this.search()}}>
            <input type="text" name="searchBarEntry" onChange={this.handleInput}></input>
            <input type="submit" placeholder="Search"></input>
          </form>
        </div>
        <div className="data-container">
          <ul>
          {this.state.events.map((data) => {
            return (
              <Event info={data} />
            )
          })}
          </ul>
        </div>
        <ReactPaginate
          previousLabel={'previous'}
          nextLabel={'next'}
          breakLabel={'...'}
          breakClassName={'break-me'}
          pageCount={this.state.pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={this.handlePageClick}
          containerClassName={'pagination'}
          subContainerClassName={'pages pagination'}
          activeClassName={'active'}
        />
      </div>
    )
  }
}


export default App;