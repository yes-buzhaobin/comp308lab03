import React from 'react';
import {register} from './StudentFunctions';
import './Register.css';

class Register extends React.Component {
    constructor() {
        super();
        this.state = {
            password:'',
            student_numer:'',
            first_name:'',
            last_name:'',
            address:'',
            city:'',
            phone_number:'',
            email:'',
            program:''
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit(e){
        e.preventDefault();

        const newStudent = {
            student_number:this.state.student_number,
            password:this.state.password,
            first_name:this.state.first_name,
            last_name:this.state.last_name,
            address:this.state.address,
            city:this.state.city,
            phone_number:this.state.phone_number,
            email:this.state.email,
            program:this.state.program
        };
        register(newStudent).then(res => {
                if(res.error){
                    console.log(res);
                }
                else {
                    this.props.history.push(`/login`);
                }
        })
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="FormFix">
                        <form className="form-horizontal" noValidate onSubmit={this.onSubmit}>
                            <h3 className="h3 mb-3 font-weight-normal">Please Sign Up</h3>
                            <div className="row">
                                <div className="col">
                                    <label htmlFor="student_number" className="labelRight">Student Number:</label>
                                </div>
                                
                                <div className="col-8">
                                    <input type="text"
                                    className="form-control"
                                    name="student_number"
                                    placeholder="Enter student number"
                                    value={this.state.student_number}
                                    onChange={this.onChange}/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <label htmlFor="password" className="labelRight">Password:</label>
                                </div>
                                <div className="col-8">
                                    <input type="passwords"
                                    className="form-control"
                                    name="password"
                                    placeholder="Enter password"
                                    value={this.state.password}
                                    onChange={this.onChange}/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <label htmlFor="first_name" className="labelRight">First Name:</label>
                                </div>
                                <div className="col-8">
                                    <input type="text"
                                    className="form-control"
                                    name="first_name"
                                    placeholder="Enter First Name"
                                    value={this.state.first_name}
                                    onChange={this.onChange}/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <label htmlFor="first_name" className="labelRight">Last Name:</label>
                                </div>
                                <div className="col-8">
                                    <input type="text"
                                    className="form-control"
                                    name="last_name"
                                    placeholder="Enter Last Name"
                                    value={this.state.last_name}
                                    onChange={this.onChange}/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <label htmlFor="address" className="labelRight">Address:</label>
                                </div>
                                <div className="col-8">
                                    <input type="text"
                                    className="form-control"
                                    name="address"
                                    placeholder="Enter Address"
                                    value={this.state.address}
                                    onChange={this.onChange}/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <label htmlFor="city" className="labelRight">City:</label>
                                </div>
                                <div className="col-8">
                                    <input type="text"
                                    className="form-control"
                                    name="city"
                                    placeholder="Enter City Name"
                                    value={this.state.city}
                                    onChange={this.onChange}/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <label htmlFor="phone_number" className="labelRight">Phone Number:</label>
                                </div>
                                <div className="col-8">
                                    <input type="text"
                                    className="form-control"
                                    name="phone_number"
                                    placeholder="Enter phone Number"
                                    value={this.state.phone_number}
                                    onChange={this.onChange}/>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col">
                                    <label htmlFor="email" className="labelRight">Email Address:</label>
                                </div>
                                <div className="col-8">
                                    <input type="email"
                                    className="form-control"
                                    name="email"
                                    placeholder="Enter Email"
                                    value={this.state.email}
                                    onChange={this.onChange}/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <label htmlFor="program" className="labelRight">Program:</label>
                                </div>
                                <div className="col-8">
                                    <input type="text"
                                    className="form-control"
                                    name="program"
                                    placeholder="Enter Program"
                                    value={this.state.program}
                                    onChange={this.onChange}/>
                                </div>
                            </div>
                            <button type="submit" className="btn btn-lg btn-primary btn-block">
                                Register
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }

}
export default Register
