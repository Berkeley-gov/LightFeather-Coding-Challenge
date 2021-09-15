import { Component } from 'react';
import React from 'react';
import axios from 'axios';
import DropdownMenu from './DropdownMenu';

// UserSignUp class component allows a user to sign up for an account.
export default class NotificationForm extends Component {
    constructor(props) {
        super(props)

        // State is set with all the necessary information needed to make an account for the user.
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            phoneNumber: '',
            selectedSupervisor: {}
        };

        // Binds all the "this" keywords to the appropriate method that is invoking it
        this.onChangeFirstName = this.onChangeFirstName.bind(this);
        this.onChangeLastName = this.onChangeLastName.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePhoneNumber = this.onChangePhoneNumber.bind(this);
        this.handleSupervisor = this.handleSupervisor.bind(this);
    }

    // Sets the username.
    onChangeFirstName = (e) => {
        this.setState({ firstName: e.target.value });
    }


    // Sets the password.
    onChangeLastName = (e) => {
        this.setState({ lastName: e.target.value });
    }

    // Sets the email
    onChangeEmail = (e) => {
        this.setState({ email: e.target.value });
    }


    // Sets the phone number
    onChangePhoneNumber = (e) => {
        this.setState({ phoneNumber: e.target.value });
    }


    // Sets the employee's supervisor
    handleSupervisor = (data) => {
        this.setState({ selectedSupervisor: JSON.parse(data) });
    }


    // Handler function that controls the functionality of the form's submission.
    onSubmit = (e) => {
        e.preventDefault();

        console.log(this.state.selectedSupervisor)

        const supervisor = this.state.selectedSupervisor;
        

        // Creating a user object on form submit and initializing all variables for it.
        const employee = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            phoneNumber: this.state.phoneNumber,
            supervisor: {
                firstName: supervisor.firstName,
                lastName: supervisor.lastName
            }
        };

        console.log(employee);

        // IMPORTANT NOTE: Front end server uses the port number 3000, not 5000 like the backend port number.

        // HTTP POST REQUEST: post request made to backend BMI API so user's new account is added to the database.
        axios.post('http://localhost:8080/api/submit', employee)
            .then(response => console.log(response))
            .catch(error => console.log('+ Failed to make the axios post request to add user to the database: ' + error));

        // Takes the user back to the login component.
        // this.props.history.push('/login');
    }


    render() {
        return (
            <div className="row-fluid bg-body" style={{ margin: '200px auto'}}>
                <div className="col-sm-4 mx-auto">
                    <form className="card shadow-lg" onSubmit={this.onSubmit} style={{ width: '100%'}}>
                        <h2 className="card-header text-center bg-dark text-white">Create Account</h2>
                        <div className="form-group row p-4">
                            <div className="form-group col-md-6">
                                <label className="fs-5 pb-2" >First Name </label>
                                <input
                                    type="text"
                                    name="first_name"
                                    id="first_name"
                                    value={this.state.firstName}
                                    className="form-control"
                                    onChange={this.onChangeFirstName}
                                    autoComplete="on"
                                    required />
                            </div>

                            <div className="form-group col-md-6">
                                <label className="fs-5 pb-2">Last Name: </label>
                                <input
                                    type="text"
                                    name="last_name"
                                    id="last_name"
                                    className="{styles.input} form-control"
                                    value={this.state.lastName}
                                    onChange={this.onChangeLastName}
                                    autoComplete="on"
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-group row p-4">
                            <div className="form-group col-md-6">
                                <label className="fs-5 pb-2">Email: </label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    className="{styles.input} form-control"
                                    value={this.state.email}
                                    onChange={this.onChangeEmail}
                                    autoComplete="on"
                                />
                            </div>

                            <div className="form-group col-md-6">
                                <label className="fs-5 pb-2">Phone number: </label>
                                <input
                                    type="tel"
                                    name="phone"
                                    id="phone"
                                    pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                                    className="{styles.input} form-control"
                                    value={this.state.phoneNumber}
                                    onChange={this.onChangePhoneNumber}
                                    autoComplete="on"
                                />
                            </div>
                        </div>

                        <div className="form-group col-md-5" style={{marginLeft: 25, paddingTop: 20}}>
                            <DropdownMenu handleSupervisor={this.handleSupervisor} selectedSupervisor={this.state.selectedSupervisor}/>
                        </div>

                        <div className="form-group pt-4 pb-4">
                            <input type="submit" value="Submit" className="btn btn-primary" style={{marginLeft: '30px'}} />
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}
