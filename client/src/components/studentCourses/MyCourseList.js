import React, {Component} from 'react';
import { Link } from 'react-router-dom';
//import jwt_decode from 'jwt-decode';
import axios from 'axios';

const Course = props => (
    <tr>
        <td>{props.course.course_code}</td>
        <td>{props.course.course_name}</td>
        <td>{props.course.my_section}</td>
        <td>{props.course.semester}</td>
        {localStorage.studenttoken && localStorage.email !== 'admin@yahoo.ca' ?  
            (<td>
                <Link to={"/editSelectedCourse/"+props.course._id}>Edit</Link> 
            </td>)
        : null}
        {localStorage.studenttoken && localStorage.email !== 'admin@yahoo.ca' ?  
            (<td>
                <Link to={"/dropCourse/"+props.course._id}>Drop</Link> 
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
        axios.get('http://localhost:5000/chosenCourses/getAllChosenCoursesByEmail/' + localStorage.email)
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