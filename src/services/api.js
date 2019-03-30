import axios from 'axios'

const API_URL = 'http://ws.audioscrobbler.com/2.0/?limit=5&format=json&method=artist.search&api_key=' + process.env.REACT_APP_LASTFM_APPKEY;

export const getArtists = (terms) => {
    const request = API_URL + '&artist=' + terms;

    return axios.get(request)
}