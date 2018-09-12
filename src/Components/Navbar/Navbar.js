import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

// Depending on the current path, this component sets the "active" class on the appropriate navigation link item
const Navbar = props => {
  let Greeting;
  if (props.loggedIn) {
    Greeting = (
      <p>
        Welcome back, <strong>{props.user[0].username}</strong>
      </p>
    );

    return (
      <nav>
        <h1 className="text-center">
          <Link to="/home">#StudentHub</Link>
          <span className="float-right">
            <Link to="/#" onClick={props._logout}>
              <button className="btn btn-danger">Log Out</button>
            </Link>
          </span>
          <span className="float-right mr-3">{Greeting}</span>
        </h1>
      </nav>
    );
  } else {
    Greeting = <p>Hello Guest!</p>;
    return (
      <nav>
        <h1 className="text-center">
          <Link to="/home">#StudentHub</Link>
          <span className="float-right">
            <Link to="/login">
              <button className="btn btn-danger">Log In</button>
            </Link>
          </span>
          <span className="float-right mr-3">{Greeting}</span>
        </h1>
      </nav>
    );
  }
};
export default Navbar;