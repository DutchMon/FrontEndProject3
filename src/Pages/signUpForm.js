import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import {Button, Form, FormGroup, Label, Input, Container} from "reactstrap";
import {Link} from "react-router-dom";


class signUpForm extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      confirmPassword: "",
      redirectTo: null
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  handleSubmit(event) {
    event.preventDefault();
    axios.post("https://cors-anywhere.herokuapp.com/https://student-hub-heroku.herokuapp.com/auth/signup", {
        username: this.state.username,
        password: this.state.password
      })
      .then(response => {
        console.log(response);
        if (!response.data.errmsg) {
          console.log("You have signed up!");
          this.setState({
            redirectTo: "/login"
          });
        } else {
          console.log("An account already exists with these details");
        }
      });
  }

  render() {
    if (this.state.redirectTo) {
      return <Redirect to={{ pathname: this.state.redirectTo }} />;
    }
    return (
      <Container>
        <Form className="SignupForm">
          <h1>Signup Form</h1>        
          <FormGroup> 
            <Label for="username" className="textColor">Username: </Label>
            <Input
              type="text"
              name="username"
              value={this.state.username}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="password" className="textColor">Password: </Label>
            <Input
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Button onClick={this.handleSubmit}>Sign Up</Button>
            <FormGroup>
            <Link to="/signup">
              <Button>Login</Button>
            </Link>
            </FormGroup>
          </FormGroup>
        </Form>
      </Container>
    );
  }
}

export default signUpForm;
