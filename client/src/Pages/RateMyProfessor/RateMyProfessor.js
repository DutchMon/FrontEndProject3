import React, { Component } from "react";
import { RMPform, RMPbtn } from "../../Components/Form";
import { Jumbotron, Input, FormGroup, Label } from "reactstrap";
import { H1, H3, H4 } from "../../Components/Form/RMPheadings";
import { Container, Row, Col } from "reactstrap";
import { Panel, PanelHeading, PanelBody } from "../../Components/Form/RMPpanel";

class RateMyProfessor extends Component {
  state = {
    firstName: "", //professor's first name
    lastName: "", //professor's lastname
    university: ""
  };

  //capturing state of inputs on change
  handleInputChange = event => {
    let { name, value } = event.target;
    this.setState({ [name]: value });
  };

  //generating the query for the search from store state
  handleFormSubmit = event => {
    event.preventDefault();
    let { firstName, lastName, university } = this.state;
    university = university.split(" ").join("+");
    let query = { firstName, lastName, university };
    this.formSubmit(query);
  };

  //function that opens new tab with search for professor
  formSubmit() {
    let queryUrl = `http://www.ratemyprofessors.com/search.jsp?queryoption=HEADER&queryBy=teacherName&schoolName=${
      this.state.university
    }&schoolID=45&query=${this.state.firstName}+${this.state.lastName}`;

    // `http://www.ratemyprofessors.com/search.jsp?query=${this.state.firstName}+${this.state.lastName}`

    //   open a new tab of the search results

    window.open(queryUrl, "_blank");
  }

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="sm-10" offset="sm-1">
            <Jumbotron>
              <H1 className="page-header text-center">
                Rate My Professor Search
              </H1>
              <H4 className="text-center">
                Search for your professor by first and last name
              </H4>
            </Jumbotron>
            <Panel>
              <PanelHeading>
                <H3>Search</H3>
              </PanelHeading>
              <PanelBody>
                <RMPform style={{ marginBottom: "30px" }}>
                  <FormGroup>
                    <Label htmlFor="firstName">
                      Enter your Professor's first name
                    </Label>
                    <Input
                      onChange={this.handleInputChange}
                      name="firstName"
                      value={this.state.firstName}
                      placeholder="First Name"
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="lastName">
                      Enter your Professor's last name
                    </Label>
                    <Input
                      onChange={this.handleInputChange}
                      name="lastName"
                      value={this.state.lastName}
                      placeholder="Last Name"
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="university">Enter your University</Label>
                    <Input
                      onChange={this.handleInputChange}
                      name="universtiy"
                      value={this.state.university}
                      placeholder="University"
                    />
                  </FormGroup>
                  <RMPbtn
                    disabled={!(this.state.firstName && this.state.lastName)}
                    onClick={this.handleFormSubmit}
                    type="info"
                  >
                    Submit
                  </RMPbtn>
                </RMPform>
              </PanelBody>
            </Panel>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default RateMyProfessor;
