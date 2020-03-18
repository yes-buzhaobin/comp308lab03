import React, {Component} from 'react';
import axios from 'axios';
import '../Register.css';

export default class EditCourse extends Component {

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

    componentDidMount() {
        axios.get('http://localhost:5000/courses/'+this.props.match.params.id)
            .then(res => {
                this.setState({
                    course_code: res.data.course_code,
                    course_name:res.data.course_name,
                    section:res.data.section,
                    semester:res.data.semester
                });
            })
            .catch(function(err){
                console.log(err);
            })
    }
    onSubmit(e) {
        e.preventDefault();

        const currentCourse = {
            course_code: this.state.course_code,
            course_name:this.state.course_name,
            section:this.state.section,
            semester:this.state.semester
        };

        axios.post('http://localhost:5000/courses/update/' 
            + this.props.match.params.id, currentCourse
        )
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
    render(){
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="FormFix">
                            <br />
                            <h3>Update course_code</h3>
                            <hr></hr>
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <label>Course Code:</label>
                                    <input type="text"
                                        className="form-control"
                                        value={this.state.course_code}
                                        onChange={this.onChangeCourseCode}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Course Name:</label>
                                    <input type="text"
                                        className="form-control"
                                        value={this.state.course_name}
                                        onChange={this.onChangeCourseName}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Section:</label>
                                    <input type="text"
                                        className="form-control"
                                        value={this.state.section}
                                        onChange={this.onChangeSection}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Semester:</label>
                                    <input type="text"
                                        className="form-control"
                                        value={this.state.semester}
                                        onChange={this.onChangeSemester}
                                    />
                                </div>
                                <br />
                                <button type="submit" className="btn btn-lg btn-primary btn-block">
                                Update Course
                            </button>
                            </form>
                        </div>
                     </div>
                </div>
            </div>
        )
    }
}