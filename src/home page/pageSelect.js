import React from 'react';
import '../styles/pageSelect.css';
import {Link } from 'react-router-dom'

export const Selector = (props) =>{
    return(<div className={props.class}>
            <Link to={props.link}>
            <img src={props.image} width='100%'></img>
            <p>{props.text}</p>
            </Link>
    </div>)
}

