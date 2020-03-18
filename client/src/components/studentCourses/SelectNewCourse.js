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
        { !props.course.selected ?  
            (<td>
                <Link to={"/addSelectedCourse/"+props.course._id}>Choose</Link> 
            </td>)
        : null}
    </tr>
)

class SelectNewCourse extends Component {
    constructor(props) {
        super(props);
        this.state = {
            courses: []
        };
    }

    componentDidMount() {
        //console.log("DisplayCourses");
        axios.get('http://localhost:5000/chosenCourses/coursesByEmail/' + localStorage.email)
            .then(res => {
                console.log("get it");
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

export default SelectNewCourse