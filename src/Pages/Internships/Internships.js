import React from 'react';
import { Jumbotron, Button, Form, FormGroup, Label, Input, Table, Modal, ModalHeader, ModalFooter, Alert, Container } from 'reactstrap';
import "./style.css";
import API from "../../utils/API.js";
import Moment from 'react-moment';
var cities = require("../../utils/cities.json");


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
      modal: false,
      saved: [],
      id: 0
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.getJobs = this.getJobs.bind(this);
    this.getJobCategories = this.getJobCategories.bind(this);
    this.toggle = this.toggle.bind(this);
    this.save = this.save.bind(this);
    this.remove = this.remove.bind(this);
  }

  componentDidMount = () => {
    this.getSavedJobs();
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
    this.clearResults();
    this.getSavedJobs();
    this.getJobs();
    API.getAdzunaJobs(this.state.job, this.state.country, this.state.city)
      .then(res => {
        this.setState({searchResults: this.state.searchResults.concat(res.data.results)});
        // console.log(this.state.searchResults);
      })
      .catch(err => console.log(err));
  }

  getJobs = () => {
    //job, type, country, city
    if (this.state.job === "IT Jobs") {
      API.getJobsAuthenticJobs()
        .then(res => {
          // console.log(res.data.listings.listing)
          this.setState({ searchResults: this.state.searchResults.concat(res.data.listings.listing) });
          console.log(res.data.listings.listing)
        })
        .catch(err => console.log(err));
    }
    API.getAdzunaJobs(this.state.job, this.state.country, this.state.city)
      .then(res =>{
        this.setState({
          searchResults: this.state.searchResults.concat(res.data.results)
        }
        );
        console.log(res);
      }
      )
        .catch(err => console.log(err));
    // console.log(this.state.searchResults);
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
    console.log(this.state.key);
    API.saveArticle({
    link: (this.state.searchResults[this.state.id].apply_url) ? this.state.searchResults[this.state.id].apply_url : this.state.searchResults[this.state.id].redirect_url,
    title: (this.state.searchResults[this.state.id].title) ? this.state.searchResults[this.state.id].title.replace(/<strong>|<\/strong>/gi, "") : this.state.searchResults[this.state.id].category.label,
    date: (this.state.searchResults[this.state.id].created) ? this.state.searchResults[this.state.id].created : this.state.searchResults[this.state.id].post_date
    })
      .then(res => console.log(res))
      .catch(err => console.log(err));
    this.setState({
      modal: false
    })
  }

  getSavedJobs = () => {
    API.getArticles()
    .then(res => this.setState({saved: res.data}))
    .catch(err => console.log(err));
  }

  toggle() {
    this.setState({
      modal: !this.state.modal,
    });
  }

  getRows = () => {
    return this.state.searchResults.map((item, index) =>
      <tr key={item.adref ? item.adref : item.id} id={item.adref ? item.adref : item.id}>
        <td>{index + 1}</td>
        <td>{(item.title) ? item.title.replace(/<strong>|<\/strong>/gi, "") : item.category.label}</td>
        <td><a href={(item.apply_url) ? item.apply_url : item.redirect_url} target="_blank">{(item.apply_url) ? item.apply_url : item.redirect_url}</a></td>
        <td><Moment format="YYYY/MM/DD" date={(item.post_date) ? item.post_date : item.company.created} /></td>
        <td><Button className="btn btn-danger" onClick={this.toggle}>Save this</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
              <ModalHeader toggle={this.toggle}>Would you like to apply for this job later?</ModalHeader>
              <ModalFooter>
                  <Button id={index} name="id" color="primary" onClick={this.save}>Save Job</Button>
                  <Button color="secondary" onClick={this.toggle}>Cancel</Button>
              </ModalFooter>
              </Modal>
        </td>
      </tr>
    )
  }

  remove = id => {
    this.setState({
      searchResults: this.searchResults.filter(x => x.id!=id)
    })
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
        
      
        <h3>Saved Jobs</h3>
        {this.state.saved.length ? 
        (
          <Container className="jobsTable">
        <Table className="ml-2 mr-2 textColor">
          <thead>
            <tr>
              <th>Title</th>
              <th>Application Link</th>
              <th>Post Date</th>
              <th>Remove Job</th>
            </tr>
          </thead>
          <tbody>
        
            {
              this.state.saved.map((elem) => 
              <tr key={elem._id} id={elem._id}>
              <td>{elem.title}</td>
              <td><a href={elem.link} alt="Job link">{elem.link}</a></td>
              <td><Moment format="YYYY/MM/DD" date={elem.date} /></td>
              <td><Button onClick={this.remove}>Remove</Button></td>
              </tr>
              ) 
            }
          </tbody>
        </Table>
        </Container>
          ): <Alert>No saved jobs</Alert>
        }
        
        <br/><br/>

        <h3>Search Results</h3>
        {this.state.searchResults.length? 
        (
        <Container className="jobsTable">
        <Table className="ml-2 mr-2 textColor">
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
            {
              this.getRows()
            }
          </tbody>
        </Table>
        </Container>
        ) : <Alert>No results to display</Alert>
        }
        
      </div>
    );
  }
}