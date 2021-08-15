import React from 'react';
import { NavLink } from 'react-router-dom';


export default function Button(props) {    
  const classes = (props.emphasized ? "button button--emphasized" : "button");
  return (
    <NavLink 
    to={props.to} 
    className={classes}
    activeClassName={classes + "--active"}>
        {props.children}
    </NavLink>
  );
}
