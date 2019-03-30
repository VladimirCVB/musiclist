import React, { Component } from 'react';
import './styles/mainScript.css';
import {BrowserRouter, Route, withRouter } from 'react-router-dom';
import App from './App';
import Main from './home page/mainScript';
import Favorite from './favorite page/favorite';

class Home extends Component {
    render(){
        return(
            <BrowserRouter>
                <Route exact path='/' component={withRouter(Main)} />
                <Route exact path='/App' component={withRouter(App)} />
                <Route exact path='/Favorites' component={withRouter(Favorite)} />
            </BrowserRouter>
        )
    }
}


export default Home