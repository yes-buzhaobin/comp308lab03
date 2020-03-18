import React, {Component} from 'react';
import axios from 'axios';
import '../Register.css';

export default class DropCourse extends Component {

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
        axios.get('http://localhost:5000/chosenCourses/'+this.props.match.params.id)
            .then(res => {
                this.setState({
                    course_code: res.data.course_code,
                    course_name:res.data.course_name,
                    my_section:res.data.my_section,
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
        axios.delete('http://localhost:5000/chosenCourses/' 
            + this.props.match.params.id
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
                            <h3>Choose a Course</h3>
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
                                        disabled={true}
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
                                Drop
                            </button>
                            </form>
                        </div>
                     </div>
                </div>
            </div>
        )
    }
}