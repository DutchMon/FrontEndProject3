import React, { Component } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
} from "reactstrap";
import { Link } from "react-router-dom";
import "./Navbar.css";

// Depending on the current path, this component sets the "active" class on the appropriate navigation link item
class Header extends Component {
  constructor(props) {
    console.log(props);
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    let Greeting;
    let Login;
    if (this.props.loggedIn === true) {
      Greeting = (
        <p>
          Welcome back, <strong>{this.props.user}</strong>
        </p>
      );
      Login = <button className="btn btn-secondary">Log Out</button>;
    } else {
      Greeting = <p className="greeting">Welcome Guest!</p>;
      Login = <button className="btn btn-secondary">Log In</button>;
    }
    return (
      <div>
        <Navbar color="dark" dark expand="md">
          <NavbarBrand>
            <Link to="/home">
              <img className="headerImage" src="/stillStudentHUB.png" alt="#studentHUB" />
            </Link>
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>{Greeting}</NavItem>
              <NavItem>
                <Link to="/login">{Login}</Link>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

export default Header;