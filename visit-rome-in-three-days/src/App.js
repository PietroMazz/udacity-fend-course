import React, {Component} from 'react';
import './App.css';
import './Normalize.css';
import Map from './Map'
import Search from './Search'
import LocationsList from './LocationsList'

class App extends Component {
  state = {
    locations: [{
      title: 'Vatican City',
      location: {
        lat: 41.902379,
        lng: 12.453349
      }
    },
    {
      title: "Castel Sant'Angelo",
      location: {
        lat: 41.903303,
        lng: 12.466287
      }
    },
    {
      title: 'Piazza Navona',
      location: {
        lat: 41.899324,
        lng: 12.473271
      }
    },
    {
      title: "Campo de' Fiori",
      location: {
        lat: 41.895791,
        lng: 12.472101
      }
    },
    {
      title: 'Colosseum',
      location: {
        lat: 41.890386,
        lng: 12.492274
      }
    },
    {
      title: 'Altare della Patria',
      location: {
        lat: 41.894804,
        lng: 12.483130
      }
    },
    {
      title: 'Capitoline Museums',
      location: {
        lat: 41.893487,
        lng: 12.482802
      }
    },
    {
      title: 'Piazza di Spagna',
      location: {
        lat: 41.905852,
        lng: 12.482294
      }
    },
    {
      title: 'Trevi Fountain',
      location: {
        lat: 41.900913,
        lng: 12.483284
      }
    },
    {
      title: 'Pantheon, Rome',
      location: {
        lat: 41.898707,
        lng: 12.476873
      }
    }
  ],
  query: ''
  }

  updateQuery = (query) => {
    this.setState({query})
  }

  render() {
    return (
      <div style={{height: 100 + "%"}} className="App">
        <header>
          <h1 className="header">Visit Rome in Three Days</h1>
        </header>
        <div className="search-area">
          <Search query={this.state.query} updateQuery={this.updateQuery}/>
        </div>
        <main>
          <Map query={this.state.query} locations={this.state.locations}/>
          <LocationsList query={this.state.query} locations={this.state.locations} />
          <footer>All the data are retrieved from Wikipedia.</footer>
        </main>
      </div>);
  }
}

export default App;
