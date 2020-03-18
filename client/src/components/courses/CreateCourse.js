import React, {Component} from 'react';
import axios from 'axios';
import '../Register.css';

export default class CreateCourse extends Component {
    constructor(props){
        super(props);
        this.onChangeCourseCode = this.onChangeCourseCode.bind(this);
        this.onChangeCourseName = this.onChangeCourseName.bind(this);
        this.onChangeSection = this.onChangeSection.bind(this);
        this.onChangeSemester = this.onChangeSemester.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        
        this.state = {
            course_code: '',
            course_name: '',
            section: '',
            semester: ''
        }
    }
    onSubmit(e) {
        e.preventDefault();

        console.log(`Form submitted:`);
        console.log(`Course Code:${this.state.course_code}`);
        console.log(`Course Name:${this.state.course_name}`);
        console.log(`Section:${this.state.section}`);
        console.log(`Semester:${this.state.semester}`);

        const newCourse = {
            course_code: this.state.course_code,
            course_name:this.state.course_name,
            section:this.state.section,
            semester:this.state.semester
        };
        this.setState = {
            course_code: '',
            course_name: '',
            section: '',
            semester: ''
        }

        axios.post('http://localhost:5000/courses/createCourse', newCourse)
            .then(res => {
                console.log(res.data);
                this.props.history.push('/displayCourses');
            });

    }
    onChangeCourseCode(e) {
        this.setState({
            course_code:e.target.value
        });
    }
    onChangeCourseName(e) {
        this.setState({
            course_name:e.target.value
        });
    }
    onChangeSection(e) {
        this.setState({
            section:e.target.value
        });
    }
    onChangeSemester(e) {
        this.setState({
            semester:e.target.value
        });
    }
    
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="FormFix">
                        <br /><br />
                        <h3 className="h3 mb-3 font-weight-normal">Add a course</h3>
                        <hr></hr>
                        <form className="form-horizontal" noValidate onSubmit={this.onSubmit}>
                            <div className="row">
                                <div className="col">
                                    <label htmlFor="course_code" className="labelRight">Course Code:</label>
                                </div>
                                <div className="col-sm-8">
                                    <input type="text"
                                    className="form-control"
                                    name="course_code"
                                    placeholder="Enter Course Code"
                                    value={this.state.course_code}
                                    onChange={this.onChangeCourseCode}/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <label htmlFor="course_name" className="labelRight">Course Name:</label>
                                </div>
                                <div className="col-8">
                                    <input type="text"
                                    className="form-control"
                                    name="course_name"
                                    placeholder="Enter course_name"
                                    value={this.state.course_name}
                                    onChange={this.onChangeCourseName}/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <label htmlFor="section" className="labelRight">Section:</label>
                                </div>
                                <div className="col-8">
                                    <input type="text"
                                    className="form-control"
                                    name="section"
                                    placeholder="Enter Section"
                                    value={this.state.section}
                                    onChange={this.onChangeSection}/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <label htmlFor="Semester" className="labelRight">Semester:</label>
                                </div>
                                <div className="col-8">
                                    <input type="text"
                                    className="form-control"
                                    name="semester"
                                    placeholder="Enter Semester"
                                    value={this.state.semester}
                                    onChange={this.onChangeSemester}/>
                                </div>
                            </div>
                            
                            
                            <button type="submit" className="btn btn-lg btn-primary btn-block">
                                Create Course
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}