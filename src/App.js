import React from 'react';
import axios from 'axios';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import NotificationForm from './components/NotificationForm';


export default class App extends React.Component {
  constructor(props) {
    super(props);

    // App component will have control of one state which will be the an entire list called from mock API. 
    this.state = {
      listOfSupervisors: []
    }
  }

  // Before mounting and initializing the App component, all supervisors are retrieved from the Mock API.
  componentDidMount() {
    // HTTP AXIOS GET REQUEST: retrieves all supervisors from the database sets to the state of App.
    axios.get('https://609aae2c0f5a13001721bb02.mockapi.io/lightfeather/managers')
    .then(response => {
      this.setState({ listOfSupervisors : response.data})
      console.log(this.state.listOfSupervisors);
    })
    .catch(error => {
      console.log('\n> Failed to retrieve the list of supervisors from the Mock API.');
      console.log(error);
    });
  }  

  render() {
    return(
      <Router>
         <Navbar />
         <Route path="/" exact={true} component={NotificationForm} />
         <Footer />
      </Router>
    );
  }
}

