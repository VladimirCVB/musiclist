import React from 'react';
import {Link } from 'react-router-dom'

export const Selector = (props) =>{
    return(<div className={props.class}>
            <Link to={props.link}>
            <img src={props.image} width='100%'></img>
            <span>{props.text}</span>
            </Link>
    </div>)
}

