import React, {Component} from 'react';
//import { Link } from 'react-router-dom';
//import jwt_decode from 'jwt-decode';
import axios from 'axios';

const Course = props => (
    <tr>
        <td>{props.course.course_name}</td>
        <td>{props.course.my_section}</td>
        <td>{props.course.student_number}</td>
        <td>{props.course.email}</td>
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
        axios.get('http://localhost:5000/chosenCourses/getStudents/' + this.props.match.params.course_code )
            .then(res => {
                console.log(res.data.courses);
                this.setState({courses: res.data.courses});
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
                        <h1 className="text-center">{this.props.match.params.course_code}</h1>
                        <br />
                    </div>
                    <table className="table col-md-6 mx-auto">
                        <thead>
                            <tr>
                                <th>Course Name</th>
                                <th>Section</th>
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