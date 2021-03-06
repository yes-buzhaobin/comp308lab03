import React, {Component} from 'react';
import { Link } from 'react-router-dom';
//import jwt_decode from 'jwt-decode';
import axios from 'axios';

const Course = props => (
    <tr>
        <td>{props.course.course_code}</td>
        <td>{props.course.course_name}</td>
        <td>{props.course.section}</td>
        <td>{props.course.semester}</td>
        <td>
             <Link to={"/editCourse/"+props.course._id}>Edit</Link> 
        </td>
        <td>
            <Link to={"/deleteCourse/"+props.course._id}>Delete</Link> 
        </td>
    </tr>
)

class DisplayCourses extends Component {
    constructor(props) {
        super(props);
        this.state = {
            courses: []
        };
    }

    componentDidMount() {
        //console.log("DisplayCourses");
        axios.get('http://localhost:5000/courses/courses')
            .then(res => {
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
                        <h1 className="text-center">COURSES</h1>
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

export default DisplayCourses