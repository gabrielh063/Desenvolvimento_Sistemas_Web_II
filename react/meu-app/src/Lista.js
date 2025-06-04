import React, {Component} from 'react'
export default class App extends Component {
  state = {
    data: [],
  }
  // método executado depois que o componente é inserido
  componentDidMount() {
    fetch('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=386.json')
      .then((result) => result.json())
      .then((result) => {
        this.setState({
          data: result.results,
        })
      })
  }
  render() {
    const result = this.state.data.map((entry, index) => {
      return <option key={index}>{entry.name}</option>
    })

    return <select>{result}</select>
  }
}
