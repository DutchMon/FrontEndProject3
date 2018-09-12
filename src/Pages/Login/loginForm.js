import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import {Button, Form, FormGroup, Label, Input, Container} from "reactstrap";
import {Link} from "react-router-dom";
import "./style.css";
class loginForm extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      redirectTo: null
    };

    // this.googleSignin = this.googleSignin.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.login(this.state.username, this.state.password);
    this.setState({
      redirectTo: "/"
    });
  }
  
  render() {
    if (this.state.redirectTo) {
      return <Redirect to={{ pathname: this.state.redirectTo }} />;
    } else {
      return (
        <Container>
        <Form className="LoginForm">
          <h1 className="LoginTitle" >Login form</h1>
          <FormGroup>
            <Label for="username">Username: </Label>
            <Input
              type="text"
              name="username"
              value={this.state.username}
              onChange={this.handleChange}
            />
            </FormGroup>
            <FormGroup>
            <Label for="password">Password: </Label>
            <Input
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
            />
            </FormGroup>
            <FormGroup>
            <Button onClick={this.handleSubmit}>Login</Button>
            <Link to="/signup">
              <Button>Sign Up</Button>
            </Link>
          </FormGroup>
        </Form>
        </Container>
      );
    }
  }
}

export default loginForm;