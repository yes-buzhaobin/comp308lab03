import React, {Component} from 'react';
import { Link } from 'react-router-dom';
//import jwt_decode from 'jwt-decode';
import axios from 'axios';

const Course = props => (
    <tr>
        <td>{props.course.course.course_code}</td>
        <td>{props.course.course.course_name}</td>
        <td>{props.course.my_section}</td>
        <td>{props.course.course.semester}</td>
        {localStorage.studenttoken ?  
            (<td>
                <Link to={"/editSelectedCourse/"+props.course.course.course_code+"/students/"+localStorage.studentNumber}>Edit</Link> 
            </td>)
        : null}
        {localStorage.studenttoken  ?  
            (<td>
                <Link to={"/dropCourse/"+props.course.course.course_code+"/students/"+localStorage.studentNumber}>Drop</Link> 
            </td>)
        : null}
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
        console.log("GetChosenCoursesByEmail = " + localStorage.email);
        axios.get('http://localhost:5000/api/students/' + localStorage.studentNumber+"/courses")
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
                        <h1 className="text-center">My COURSES List</h1>
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