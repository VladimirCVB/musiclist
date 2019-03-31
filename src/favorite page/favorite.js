import React, { Component } from 'react';
import { ArtistCard } from '../components/artistCard';
import NavBar from '../components/navBar';
import MenuBar from '../components/menu';
import '../styles/favorites.css'

class Favorite extends Component {
    state = {
        savedArtists: JSON.parse(localStorage.getItem('savedArtists'))
    }

    deleteArtist = (artist) => {
        const result = this.state.savedArtists.filter(item => item.name !== artist.name )
        this.updateArtist(result);
    }

    updateArtist = (newArtist) =>{
        this.setState({ savedArtists: newArtist })
        localStorage.setItem('savedArtists', JSON.stringify(newArtist));
    }

    render(){
        return(<div>
            <NavBar>
                <MenuBar button1='Home' page1='/' button2='Artists' page2='/App' />
            </NavBar>
            <div className="artist-container">
          {
            this.state.savedArtists.map((artist, index) => <ArtistCard artist={artist} key={index} deleteArtist={this.deleteArtist} link={artist.url} />)
          }
        </div>
    </div>
        )
    }
}

export default Favorite