import React, {Component} from 'react';
import axios from 'axios';
import '../Register.css';

export default class AddSelectedCourse extends Component {

    constructor(props){
        super(props);
        this.onChangeCourseCode = this.onChangeCourseCode.bind(this);
        this.onChangeCourseName = this.onChangeCourseName.bind(this);
        this.onChangeMySection = this.onChangeMySection.bind(this);
        this.onChangeSemester = this.onChangeSemester.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            course_code: '',
            course_name: '',
            section: '',
            my_section:'1',
            semester: '',
            error_message: ''
        }
    }

    componentDidMount() {
        this.setState({error_message: ""});
        axios.get('http://localhost:5000/api/courses/'+this.props.match.params.course_code)
            .then(res => {
                var course = res.data.course;
                this.setState({
                    course_code: course.course_code,
                    course_name: course.course_name,
                    my_section: 1,
                    section: course.section,
                    semester: course.semester
                });
            })
            .catch(function(err){
                console.log(err);
                this.setState({
                    error_message: err
                });
            });
    }
    
    onSubmit(e) {
        e.preventDefault();

        const currentCourse = {
            my_section:this.state.my_section
        };
        this.setState({error_message: ""});

        axios.post('http://localhost:5000/api/courses/'+this.state.course_code+'/students/'+ localStorage.studentNumber
            , currentCourse
        )
            .then(res => {
                console.log(res);
                this.props.history.push('/myCourseList');
            }).catch(function(err){
                console.log(err);
                this.setState({
                    error_message: err
                });
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
    onChangeMySection(e) {
        this.setState({
            my_section:e.target.value
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
                            <h3>Choose a Course</h3>
        <hr></hr>
        <h>{this.state.error_message}</h>
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <label>Course Code:</label>
                                    <input type="text"
                                        className="form-control"
                                        disabled={true}
                                        value={this.state.course_code}
                                        onChange={this.onChangeCourseCode}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Course Name:</label>
                                    <input type="text"
                                        className="form-control"
                                        disabled={true}
                                        value={this.state.course_name}
                                        onChange={this.onChangeCourseName}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Choose My Section:</label>
                                    <input type="number"
                                        className="form-control"
                                        min="1"
                                        max={this.state.section}
                                        value={this.state.my_section}
                                        onChange={this.onChangeMySection}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Semester:</label>
                                    <input type="text"
                                        className="form-control"
                                        disabled={true}
                                        value={this.state.semester}
                                        onChange={this.onChangeSemester}
                                    />
                                </div>
                                <br />
                                <button type="submit" className="btn btn-lg btn-primary btn-block">
                                Save Your Choose
                            </button>
                            </form>
                        </div>
                     </div>
                </div>
            </div>
        )
    }
}