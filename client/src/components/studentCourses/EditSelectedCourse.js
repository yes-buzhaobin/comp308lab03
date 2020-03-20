import React, {Component} from 'react';
import axios from 'axios';
import '../Register.css';

export default class EditSelectedCourse extends Component {

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
            my_section:'',
            semester: ''
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/api/courses/'+this.props.match.params.course_code+'/students/'+this.props.match.params.course_code)
        .then(res => {
            this.setState({
                course_code: res.data.coursestudent.course.course_code,
                course_name:res.data.coursestudent.course.course_name,
                my_section:res.data.coursestudent.my_section,
                section:res.data.coursestudent.course.section,
                semester:res.data.coursestudent.course.semester
            });
        })
        .catch(function(err){
            console.log(err);
        })
    }
    onSubmit(e) {
        e.preventDefault();

        const currentCourse = {
            my_section:this.state.my_section
        };

        axios.put('http://localhost:5000/api/courses/'+this.props.match.params.course_code+'/students/'+this.props.match.params.course_code,
            currentCourse
            )
            .then(res => {
                console.log(res.data);
                this.props.history.push('/myCourseList');
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
                            <h3>Change Section</h3>
                            <hr></hr>
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
                                Save Your Change
                            </button>
                            </form>
                        </div>
                     </div>
                </div>
            </div>
        )
    }
}