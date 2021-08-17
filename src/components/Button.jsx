import React from 'react';
import { NavLink } from 'react-router-dom';


export default function Button({ to, emphasized, children }) {    
  const classes = (emphasized ? "button button--emphasized" : "button");
  return (
    <NavLink 
    to={ to } 
    className={ classes }
    activeClassName={ classes + "--active" }>
        { children }
    </NavLink>
  );
}
