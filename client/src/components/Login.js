import React, {Component} from 'react';
// import axios from 'axios';
import {login} from './StudentFunctions';
import './Register.css';

class Login extends Component {
    constructor() {
        super();
        this.state = {
            email:'',
            password:''
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit(e){
        e.preventDefault();
        const student = {
            email:this.state.email,
            password:this.state.password
        };
        
        login(student).then(res => {
                console.log(res);
                window.location.reload();
                this.props.history.push(`/`);
        });
    }

    render() {
        return (
            <div className="container">
                <div className="FormFix">
                    <div className="col-md-6 mat-5 mx-auto">
                        <form noValidate onSubmit={this.onSubmit}>
                            <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
                            <div className="row">
                                <div className="col">
                                    <label htmlFor="email">Email Address</label>
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
                                    <label htmlFor="password">Password</label>
                                </div>
                                <div className="col-8">
                                    <input type="password"
                                    className="form-control"
                                    name="password"
                                    placeholder="Enter password"
                                    value={this.state.password}
                                    onChange={this.onChange}/>
                                </div>
                            </div>
                            <button type="submit" className="btn btn-lg btn-primary btn-block">
                                Login in
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }

}
export default Login