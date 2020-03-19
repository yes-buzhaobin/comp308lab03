import React, {Component} from 'react';
//import { Link } from 'react-router-dom';
//import jwt_decode from 'jwt-decode';
import axios from 'axios';

const Course = props => (
    <tr>
        <td>{props.course.course_code}</td>
        <td>{props.course.course_name}</td>
        <td>{props.course.my_section}</td>
        <td>{props.course.semester}</td>
       
    </tr>
)

class StudentCourseList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            courses: []
        };
    }

    componentDidMount() {

        axios.get('http://localhost:5000/students/'+ + this.props.match.params.student_number+'/courses')
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
                        <h1 className="text-center">List all courses taken by student: {this.props.match.params.student_number}</h1>
                    </div>
                    <table className="table col-md-6 mx-auto">
                        <thead>
                            <tr>
                                <th>Course Code</th>
                                <th>Course Name</th>
                                <th>Section</th>
                                <th>Semester</th>
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

export default StudentCourseList