import React, { Component } from 'react';
import { SearchResult } from './components/searchResult';
import DialogBox from './components/dialogBox';
import NavBar from './components/navBar';
import MenuBar from './components/menu'

import {
  TextField,
  Button,
  List,
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
    valid: false,
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
      artists: [],
      on: false,
      valid: false
    })
  }

  onResultClick = (artist) => {
    //this.clearSearch();
    const savedArtists = this.state.savedArtists;
    var arr = JSON.parse(localStorage.getItem('savedArtists'));
    //use this to stop forEach var BreakException = {};
    var notValid = [];

    const check = arr.forEach((artists) =>{
      if(artists.name === artist.name){
        return notValid.push('Error');
      }
    });

    if(notValid.includes('Error')){
      this.setState({valid: true, on: false})
    }
    else{
      savedArtists.push(artist);
      this.updateArtist(savedArtists);
      this.setState({on: true, valid: false}); 
    }
  }

  updateArtist = (newArtist) =>{
    this.setState({ savedArtists: newArtist })
    localStorage.setItem('savedArtists', JSON.stringify(newArtist));
  }

  clearDialog = () =>{
    this.setState({on: false})
  }

  clearValidation = () => {
    this.setState({valid: false})
  }

  render() {
    const results = this.state.artists || [];
    return (
      <div className="App">
      <DialogBox 
      id='added' 
      state={this.state.on} 
      clear={this.clearDialog}
      message='Artist added to favorites!'
      link='Go to Favorite' />

      <DialogBox 
      id='notValid' 
      state={this.state.valid} 
      clear={this.clearValidation}
      message='Artist already added!' />
      <NavBar>
      <MenuBar button1='Home' page1='/' button2='Favorites' page2='/Favorites' />
        <div className='searchField'>
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
              </div>
              {!isEmpty(this.state.searchTerm) && (
                <div className='searchButton'>
                <Button
                  onClick={this.clearSearch}
                  variant="contained"
                >
                  Clear
                </Button></div>)
              }
              </NavBar>



        <List className="search-results">
          {
            results.map((artist, index) => <SearchResult key={index} artist={artist} onResultClick={this.onResultClick} />)
          }
        </List>
      </div>
    );
  }
}

export default App;