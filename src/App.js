import React, { Component } from 'react';
import './App.css';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { TextField, Button, ListItem, List, ListItemAvatar, ListItemText, Avatar } from '@material-ui/core';
import axios from 'axios';

// &artist=cher

const API_URL = 'http://ws.audioscrobbler.com/2.0/?limit=5&format=json&method=artist.search&api_key=' + process.env.REACT_APP_LASTFM_APPKEY;

const isEmpty = (str) => str.length === 0;

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

  clearSearch = () => {
    this.setState({
    searchTerm: '',
    artists: [],
  })
  }

  onResultClick = (artist) => {
    return console.log(artist)
  }

  search = (terms) => {
    const request = API_URL + '&artist=' + terms;
    axios.get(request).then((response) => {
      const results = response.data.results;
      const artists = results.artistmatches.artist.map((artist) => {
        const avatarImage = artist.image.find(image => image.size === 'medium');
        const imageUrl = avatarImage['#text'];
        return{...artist, avatar: imageUrl }
      });
      

      this.setState({artists});
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
                Music
          </Typography>
              <TextField
                placeholder="Search on LastFM"
                onChange={this.onTextChange}
                value={this.state.searchTerm}
              />
              <Button
                onClick={this.onSearchClick} disabled={this.state.searchTerm.length ===0}
              >
                Search
              </Button>
              {!isEmpty(this.state.searchTerm) &&(
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
        <div>
      <List>
        {this.state.artists.map((artist) => {
         return <div><ListItem key={artist.name} ><ListItemAvatar><Avatar src={artist.avatar} /></ListItemAvatar>
         <span>{artist.name} </span>
         <span>Number of listeners: {artist.listeners}</span>
         <ListItemText primary={artist.name} />
         </ListItem>
         <Button onClick = {this.onResultClick(artist)}>Favorite</Button></div>
        })}
      </List>
        </div>
      </div>

    );
  }
}

export default App;