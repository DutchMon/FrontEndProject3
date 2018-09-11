import React from "react";
import Container from "../Components/Container/index";

const Home = props => {
  if (props.user) {
    return (
      <div className="Home">
        <div className="jumbotron text-center">
          <h3>
            Welcome <code>{JSON.stringify(props)}</code>! Have a Successful day
            everyday!
          </h3>
        </div>
        <Container />
      </div>
    );
  } else {
    return (
      <div className="Home">
        <div className="jumbotron text-center">
          <h3>Welcome! Have a Successful day everyday!</h3>
        </div>
        <Container />
      </div>
    );
  }
};

export default Home;
