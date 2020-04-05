import React, {Component} from 'react';
import { Link } from 'react-router-dom';


class DisplayCourses extends Component {
    constructor(props) {
        super(props);
        this.state = {
           
        };
    }

    componentDidMount() {
        //console.log("DisplayCourses");
        
    }
    

    render() {
        return (
            <div className="container">
                <div className="jumbotron mt-5">
                    <div className="col-sm-8 mx-auto">
                        <h1 className="text-center">Student Courses registration system - Homepage</h1>
                    </div>
                    <div>
                        <ul>
                            <li><Link to={"/course_list"}>List all courses</Link> </li>
                            <li><Link to={"/student_list"}>List all students</Link> </li>
                            <li><Link to={"/register"}>register an account</Link> </li>
                            <li><Link to={"/login"}>Login</Link> </li>
                        </ul>
                    </div>
                    <h2>we do support two different roles: admin and normal students. only admin and create, edit delete a courses. 
                        students can only choose or edit section or drop a course</h2>
                    <div>
                        <ul>
                            <li class="text-info"> <span>View my profile</span></li>
                            <li class="text-info"> View logout</li>
                            <li class="text-info"> Create a course</li>
                            <li class="text-info"> Update a course </li>
                            <li class="text-info"> delete a course </li>
                            <li class="text-info"> View all students of one course </li>
                            
                            <li class="text-info"> View my courses list </li>
                            <li class="text-info"> choose a course </li>
                            <li class="text-info"> edit a choose course's section </li>
                            <li class="text-info"> drop a course </li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

export default DisplayCourses