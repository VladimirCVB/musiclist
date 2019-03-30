import React from 'react';
import {Card, CardContent, CardActions, Button} from '@material-ui/core';
// import { Rating } from 'material-ui-rating';

export const ArtistCard = (props) => {
    const {artist, deleteArtist} = props;
    return (
    <Card className="artist-card">
    <img
          src={artist.cardImage}
          title={artist.name}
          alt = {artist.name}
        />
    <CardContent>
      <h3>{artist.name}</h3>
      <p>{artist.listeners} listeners</p>
    </CardContent>
    <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
        <Button size="small" color="primary" onClick={() => deleteArtist(artist)}>
          Delete
        </Button>
      </CardActions>
  </Card>
  )
}