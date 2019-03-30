import React, { Component } from 'react';
import { ArtistCard } from '../components/artistCard';

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
        return(
            <div className="artist-container">
          {
            this.state.savedArtists.map((artist, index) => <ArtistCard artist={artist} key={index} deleteArtist={this.deleteArtist} />)
          }
        </div>
        )
    }
}

export default Favorite