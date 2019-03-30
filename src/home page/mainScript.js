import React, { Component } from 'react';
import '../styles/mainScript.css';
import artists from '../images/artists.jpg';
import favorite from '../images/favorite.jpg'
import {Selector} from './pageSelect';

class Main extends Component {
    render(){
        return(
            <div>
                <Selector class='artists' link='/App' image={artists}text='Artists'/>
                <Selector class='favorit' link='/Favorites' image={favorite} text='Favorite' />
            </div>           
        )
    }
}

export default Main