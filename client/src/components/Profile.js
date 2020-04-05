import React, {Component} from 'react';
import axios from 'axios';

class Profile extends Component {
    constructor() {
        super();
        this.state = {
            student_numer:'',
            password:'',
            first_name:'',
            last_name:'',
            address:'',
            city:'',
            phone_number:'',
            email:'',
            program:''
        }
    }

    componentDidMount() {
        const student_number = localStorage.studentNumber;
        axios.get('http://localhost:5000/api/students/' + student_number )
            .then(res => {
                console.log(res.data);
                var student = res.data.student;
                this.setState({
                    student_numer: student.student_number,
                    first_name: student.first_name,
                    last_name: student.last_name,
                    address: student.address,
                    city: student.city,
                    phone_number: student.phone_number,
                    email: student.email,
                    program: student.program
                })
            }).catch(function (error) {
                console.log(error);
            });
        
    }

    render() {
        return (
            <div className="container">
                <div className="jumbotron mt-5">
                    <div className="col-sm-8 mx-auto">
                        <h1 className="text-center">PROFILE</h1>
                    </div>
                    <table className="table col-md-6 mx-auto">
                        <tbody>
                            <tr>
                                <td>
                                    <div>
                                        <label>Student Number:</label>
                                    </div>
                                </td>
                                <td>
                                    <div>
                                        <label>First Name:</label>
                                    </div>
                                </td>
                                <td>
                                    <div>
                                        <label>Last Name:</label>
                                    </div>
                                </td>
                                <td>
                                    <div>
                                        <label>Address:</label>
                                    </div>
                                </td>
                                <td>
                                <div>
                                        <label>City:</label>
                                    </div>
                                </td>
                                <td>
                                <div>
                                        <label>Phone Number:</label>
                                    </div>
                                </td>
                                <td>
                                    <div>
                                        <label>Email:</label>
                                    </div>
                                </td>
                                <td>
                                    <div>
                                        <label>Program:</label>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>{this.state.student_numer}</td>
                                <td>{this.state.first_name}</td>
                                <td>{this.state.last_name}</td>
                                <td>{this.state.address}</td>
                                <td>{this.state.city}</td>
                                <td>{this.state.phone_number}</td>
                                <td>{this.state.email}</td>
                                <td>{this.state.program}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default Profile