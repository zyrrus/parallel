import { NavLink } from "react-router-dom";

export function ButtonTo({ to, emphasized, children }) {
    // Redirect button

    const classes = emphasized ? "button button--emphasized" : "button";
    return (
        <NavLink
            to={to}
            className={classes}
            activeclassname={classes + "--active"}>
            {children}
        </NavLink>
    );
}

export function ButtonDo({ onClick, emphasized, children }) {
    // Button that performs a function

    const classes = emphasized ? "button button--emphasized" : "button";
    return (
        <p onClick={onClick} className={classes}>
            {children}
        </p>
    );
}
