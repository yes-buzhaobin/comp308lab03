import React, {Component} from 'react';
import { Link } from 'react-router-dom';
//import jwt_decode from 'jwt-decode';
import axios from 'axios';

const Student = props => (
    <tr>
        <td>{props.student.student_number}</td>
        <td>{props.student.first_name}</td>
        <td>{props.student.last_name}</td>
        <td>{props.student.email}</td>
        <td>{props.student.program}</td>
        <td>
                <Link to={"/myStudentList/"+props.student.student_number}>List all choose courses</Link> 
        </td>
    </tr>
)

class StudentList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            students: []
        };
    }

    componentDidMount() {
        console.log("Show student list..");
        axios.get('http://localhost:5000/students/' )
            .then(res => {
                console.log(res.data.students);
                this.setState({students: res.data.students});
            }).catch(function (error) {
                console.log(error);
            })
    }
    studentList() {
        return this.state.students.map(function(currentStudent, i) {
            return <Student student={currentStudent} key={i} />;
        });
    }

    render() {
        return (
            <div className="container">
                <div className="jumbotron mt-5">
                    <div className="col-sm-8 mx-auto">
                        <h1 className="text-center">List all students</h1>
                        <br />
                    </div>
                    <table className="table col-md-6 mx-auto">
                        <thead>
                            <tr>
                                <th>Student Number</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Student Email</th>
                                <th>Program</th>
                            </tr>
                        </thead>
                        <tbody>
                            { this.studentList() }
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default StudentList