import React, { Component } from "react";
import { Redirect } from "react-router-dom";

//google button images linked here
// import googleButton from "./google_signin_buttons/web/1x/btn_google_signin_dark_normal_web.png";

class loginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      redirectTo: null
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  //capturing state of inputs on change
  handleChange = event => {
    let { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit(event) {
    event.preventDefault();
    this.props.login(this.state.username, this.state.password);
    this.setState({
      redirectTo: "/schedule"
    });
  }

  render() {
    if (this.state.redirectTo) {
      return <Redirect to={{ pathname: this.state.redirectTo }} />;
    } else {
      return (
        <div className="LoginForm">
          <h1>Login form</h1>
          <form>
            <label htmlFor="username">Username: </label>
            <input
              type="text"
              name="username"
              value={this.state.username}
              onChange={this.handleChange}
            />
            <label htmlFor="password">Password: </label>
            <input
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
            />
            <button onClick={this.handleSubmit}>Login</button>
            <Link to="/signup">
              <button>Sign Up</button>
            </Link>
          </form>
        </div>
      );
    }
  }
}

export default loginForm;