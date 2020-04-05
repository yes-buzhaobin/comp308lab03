import React, {Component} from 'react';
//import { Link } from 'react-router-dom';
//import jwt_decode from 'jwt-decode';
import axios from 'axios';

const Course = props => (
    <tr>
        <td>{props.course.course.course_code}</td>
        <td>{props.course.course.course_name}</td>
        <td>{props.course.my_section}</td>
        <td>{props.course.course.semester}</td>
        <td>{props.course.student.student_number}</td>
        <td>{props.course.student.email}</td>
    </tr>
)

class ShowClass extends Component {
    constructor(props) {
        super(props);
        this.state = {
            courses: []
        };
    }

    componentDidMount() {
        console.log("Show Class..");
        axios.get('http://localhost:5000/api/courses/' + this.props.match.params.course_code+'/students' )
            .then(res => {
                console.log(res.data.coursestudentList);
                this.setState({courses: res.data.coursestudentList});
            }).catch(function (error) {
                console.log(error);
            })
    }
    courseList() {
        return this.state.courses.map(function(currentCourse, i) {
            return <Course course={currentCourse} key={i} />;
        });
    }

    render() {
        return (
            <div className="container">
                <div className="jumbotron mt-5">
                    <div className="col-sm-8 mx-auto">
                        <h1 className="text-center">List all students of {this.props.match.params.course_code}</h1>
                        <br />
                    </div>
                    <table className="table col-md-6 mx-auto">
                        <thead>
                            <tr>
                                <th>Course Code</th>
                                <th>Course Name</th>
                                <th>Section</th>
                                <th>Semester</th>
                                <th>Student_number</th>
                                <th>Student_email</th>
                            </tr>
                        </thead>
                        <tbody>
                            { this.courseList() }
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default ShowClass