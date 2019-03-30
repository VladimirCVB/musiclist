import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { SearchResult } from './components/searchResult';
import DialogBox, { Dialog } from './components/dialogBox';

import {
  TextField,
  Button,
  List,
  DialogContent
} from '@material-ui/core';
import axios from 'axios';

import './styles/App.css';

const API_URL = 'http://ws.audioscrobbler.com/2.0/?limit=5&format=json&method=artist.search&api_key=' + process.env.REACT_APP_LASTFM_APPKEY;

const isEmpty = (str) => str.length === 0;
class App extends Component {
  state = {
    searchTerm: '',
    savedArtists: [],
    on: false,
  }

  componentDidMount() {
    const existing = localStorage.getItem('savedArtists')
    if (existing) {
      this.setState({ savedArtists: JSON.parse(existing) })
    }
  }

  onTextChange = (event) => {
    const value = event.target.value;

    this.setState({ searchTerm: value });
  }

  search = (terms) => {
    const request = API_URL + '&artist=' + terms;

    axios.get(request).then((response) => {
      const results = response.data.results;
      const artists = results.artistmatches.artist.map((artist) => {
        const avatarImage = artist.image.find(image => image.size === 'medium');
        const cardImage = artist.image.find(image => image.size === 'large')['#text'];
        const imageUrl = avatarImage['#text'];
        return { ...artist, avatar: imageUrl, cardImage }
      });

      this.setState({ artists });
    })
  }

  onSearchClick = () => {
    this.search(this.state.searchTerm);
  }

  onEnter = (e) => {
    if (e.keyCode == 13) {
      return this.onSearchClick();
    }
  }

  clearSearch = () => {
    this.setState({
      searchTerm: '',
      artists: []
    })
  }

  onResultClick = (artist) => {
    //this.clearSearch();
    this.setState({on: true})
    const savedArtists = this.state.savedArtists;
    savedArtists.push(artist)
    this.updateArtist(savedArtists)
  }

  updateArtist = (newArtist) =>{
    this.setState({ savedArtists: newArtist })
    localStorage.setItem('savedArtists', JSON.stringify(newArtist));
  }

  clearDialog = () =>{
    this.setState({on: false})
  }

  render() {
    const results = this.state.artists || [];
    return (
      <div className="App">
        <header className="App-header">
          <AppBar position="static" color="primary">
            <Toolbar className="search-bar">
              <Typography variant="h6" color="inherit">
                Music
              </Typography>
              <TextField
                placeholder="Search on Last.fm"
                className="search-input"
                onChange={this.onTextChange}
                value={this.state.searchTerm}
                onKeyUp={this.onEnter}
              />
              <Button
                onClick={this.onSearchClick}
                variant="contained"
                color="secondary"
                disabled={isEmpty(this.state.searchTerm)}
              >
                Search
              </Button>
              {!isEmpty(this.state.searchTerm) && (
                <Button
                  onClick={this.clearSearch}
                  variant="contained"
                >
                  Clear
                </Button>)
              }
            </Toolbar>
          </AppBar>
        </header>

        <List className="search-results">
          {
            results.map((artist, index) => <SearchResult key={index} artist={artist} onResultClick={this.onResultClick} />)
          }
        </List>
        <DialogBox state={this.state.on} clear={this.clearDialog} />
      </div>
    );
  }
}

export default App;