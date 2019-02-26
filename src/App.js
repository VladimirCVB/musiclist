import React, { Component } from 'react';
import './App.css';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { TextField, Button } from '@material-ui/core';
import axios from 'axios';

// &artist=cher

const API_URL = 'http://ws.audioscrobbler.com/2.0/?format=json&method=artist.search&api_key=' + process.env.REACT_APP_LASTFM_APPKEY;

class App extends Component {
  state = {
    searchTerm: '',
    artists: []
  }
  onTextChange = (event) => {
    const value = event.target.value;
    this.setState({ searchTerm: value });
  }

  onSearchClick = () => {
    console.log(this.state.searchTerm);
    this.search(this.state.searchTerm)
  }

  search = (terms) => {
    const request = API_URL + '&artist=' + terms;
    axios.get(request).then((response) => {
      this.setState({artists: response.data.results.artistmatches.artist})
    })

    console.log(request);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <AppBar position="static" color="primary">
            <Toolbar>
              <Typography variant="h6" color="inherit">
                Photos
          </Typography>
              <TextField
                placeholder="Search on spotify"
                onChange={this.onTextChange}
                value={this.state.searchTerm}
              />
              <Button
                onClick={this.onSearchClick} disabled={this.state.searchTerm.length ===0}
              >
                Search
              </Button>
            </Toolbar>
          </AppBar>
        </header>
        <div>
      <ul>
        {this.state.artists.map((artist) => {
         return <li key={artist.name}><span>{artist.name}</span> Number of listeners: <span>{artist.listeners}</span></li>
        })}
      </ul>
        </div>
      </div>

    );
  }
}

export default App;