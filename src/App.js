import React, { Component } from 'react';
import './App.css';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { TextField, Button } from '@material-ui/core';

class App extends Component {
  state = {
    searchTerm: ''
  }
  onTextChange = (event) => {
    const value = event.target.value;
    this.setState({ searchTerm: value });
  }

  onSearchClick = () => {
    console.log(this.state.searchTerm);
    this.setState({ searchTerm: '' })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
<<<<<<< HEAD
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
=======
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
>>>>>>> 557356475bf6a7bc2028627784394e61e6302d3a
        </header>
        <div>

        </div>
      </div>

    );
  }
}

export default App;