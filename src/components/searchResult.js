import React from 'react';
import {ListItem,
    ListItemAvatar,
    ListItemText,
    Avatar,
    Button
} from '@material-ui/core';

export const SearchResult = (props) => {
    const {artist, onResultClick} = props;
    return (
        <ListItem
          button
          key={artist.name}
          className="result"
          onClick={() => onResultClick(artist)}
        >
          <ListItemAvatar>
            <Avatar src={artist.avatar} alt={artist.name} />
          </ListItemAvatar>
          <ListItemText primary={artist.name} />
          <ListItemText primary={artist.url} />
          <Button
            variant="outlined"
            color="secondary"
            size="small"
            className="add-button"
          >
            Add to favorites
          </Button>
        </ListItem>
      )
}