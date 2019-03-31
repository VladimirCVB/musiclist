import React from 'react';
import '../styles/dialogBox.css';
import {Link} from 'react-router-dom';

export const Dialog = (props) => {
        return <div>
            {props.state && (<div id={props.id}>

                <button onClick={props.clear}>Close</button>
                <h3>{props.message}</h3>
                <Link to='/Favorites'>{props.link}</Link>
                
                </div>)}
        </div>
}

export default Dialog