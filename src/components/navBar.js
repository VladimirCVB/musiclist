import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

export const NavBar = (props) => {
    return (
        <header className="App-header">
            <AppBar position="static" color="primary">
            <Toolbar className="search-bar">
            <Typography variant="h6" color="inherit">
                        Music List Searcher 
            </Typography>
            {props.children}
            </Toolbar>
            </AppBar>
            </header>
    )
}

export default NavBar