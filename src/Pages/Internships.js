import React from 'react';
import { Jumbotron, Button, Form, FormGroup, Label, Input, Table } from 'reactstrap';
import API from "../utils/API.js";
import Moment from 'react-moment';
var cities = require("../utils/cities.json");

function getCountry() {
  let countries = Object.keys(cities);
  return countries;
}
const places = getCountry();
function getOtherOptions() {
  let options = places.map((country, index) => <option key={index} data={country}>{country}</option>)
  return options;
}


function getCities(country) {
  if (country) {
    let options = cities[country].map((city, index) => <option key={index} data={city}>{city}</option>)
    return options;
  }
  else {
    return <option key={19876} data={"..."}>{"..."}</option>;
  }
}

export default class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      job: "",
      categories: [],
      jobType: "",
      country: "",
      city: "",
      searchResults: [],
      source: ""
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.getJobs = this.getJobs.bind(this);
    this.getJobCategories = this.getJobCategories.bind(this);
  }

  componentDidMount = () => {
    this.getJobCategories();
    let adzunaCategories = [];
    API.getAdzunaJobCategories()
      .then(res => {
        res.data.results.forEach((elem) => {
          adzunaCategories.push(elem.label);
        });
        this.setState({
          categories: this.state.categories.concat(adzunaCategories)
        })
      }
      )
      .catch(err => console.log(err));
  }

  handleInputChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  }

  clearResults = () => {
    this.setState({
      searchResults: []
    });
  }

  handleSubmit = e => {
    e.preventDefault();
    this.clearResults()
    this.getJobs();
    API.getAdzunaJobs(this.state.job, this.state.country, this.state.city)
      .then(res => console.log(res.data.results))
      .catch(err => console.log(err));
  }

  getJobs = () => {
    //job, type, country, city
    if (this.state.job === "IT Jobs") {
      API.getJobsAuthenticJobs()
        .then(res => {
          this.setState({ searchResults: this.state.searchResults.concat(res.data.listings.listing) });
        })
        .catch(err => console.log(err));
    }
    API.getAdzunaJobs(this.state.job, this.state.country, this.state.city)
      .then(res =>
        this.setState({
          searchResults: this.state.searchResults.concat(res.data.results)
        }
        ));
    console.log(this.state.searchResults);
  }

  getJobCategories = () => {
    let authenticCategories = [];
    API.getJobCategories()
      .then(res => {
        res.data.categories.category.forEach((elem) => {
          authenticCategories.push(elem.name);
        })
        this.setState({
          categories: this.state.categories.concat(authenticCategories)
        });
      }
      )
      .catch(err => console.log(err));
  }

  save = () => {
    API.saveArticle()
      .then(res => console(res))
      .catch(err => console.log(err));
  }

  getRows = () => {
    return this.state.searchResults.map((item, index) =>
      <tr id={index}>
        <td>{index + 1}</td>
        <td>{(item.title) ? item.title.replace(/<strong>|<\/strong>/gi, "") : item.category.label}</td>
        <td><a href={(item.apply_url) ? item.apply_url : item.redirect_url} target="_blank">{(item.apply_url) ? item.apply_url : item.redirect_url}</a></td>
        <td><Moment format="YYYY/MM/DD" date={(item.post_date) ? item.post_date : item.company.created} /></td>
        <td><Button className="btn btn-danger" onClick={this.save}>Save this</Button></td>
      </tr>
    )
  }

  render() {
    return (
      <div>
        <Jumbotron>
          <Form inline>
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
              <Label for="jobField" className="mr-sm-2">Job field</Label>
              <Input type="select" name="job" id="jobField" value={this.state.job} source={this.state.source} placeholder="Example: Web developer" onChange={this.handleInputChange}>
                {(this.state.categories) ? this.state.categories.map((category, index) => <option id={index}>{category}</option>) : <option>...</option>}
              </Input>
            </FormGroup>
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
              <Label for="jobType" className="mr-sm-2">Job Type</Label>
              <Input type="select" name="jobType" id="jobType" value={this.state.jobType} onChange={this.handleInputChange}>
                <option>Part-time / Internship</option>
                <option>Full-time</option>
              </Input>
            </FormGroup>
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0 mt-sm-2">
              <Label for="country" className="mr-sm-2">Country Preferred</Label>
              <Input type="select" name="country" id="country" value={this.state.country} onChange={this.handleInputChange}>
                {getOtherOptions()}
              </Input>
            </FormGroup>
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0  mt-sm-2">
              <Label for="cities" className="mr-sm-2">City Preferred (Optional)</Label>
              <Input type="select" name="city" id="city" value={this.state.city} onChange={this.handleInputChange}>
                {getCities(this.state.country)}
              </Input>
            </FormGroup>
            <Button className="mb-2 mr-sm-2 mb-sm-0 mt-sm-2" onClick={this.handleSubmit}>Submit</Button>
          </Form>
        </Jumbotron>
        <br />
        {/* <Container> */}
        <Table className="ml-2 mr-2">
          <thead>
            <tr>
              <th>Job ID</th>
              <th>Title</th>
              <th>Application Link</th>
              <th>Post Date</th>
              <th>Save Job</th>
            </tr>
          </thead>
          <tbody>
            {(this.state.searchResults) ?
              this.getRows() : "No results"
            }
          </tbody>
        </Table>
        {/* </Container> */}
      </div>
    );
  }
}