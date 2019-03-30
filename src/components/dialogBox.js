import React from 'react';
import '../styles/dialogBox.css';
import {Link} from 'react-router-dom';

export const Dialog = (props) => {
        return <div id='box'>
            {props.state && (<div>

                <button onClick={props.clear}>x</button>
                <h4>Artist Added</h4>
                <Link to='/Favorites'>Go to Favorite</Link>
                
                </div>)}
        </div>
}

export default Dialog