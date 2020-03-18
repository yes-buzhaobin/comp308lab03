import React, {Component} from 'react';
import axios from 'axios';
import '../Register.css';

export default class DeleteCourse extends Component {

    constructor(props){
        super(props);
        this.onChangeCourseCode = this.onChangeCourseCode.bind(this);
        this.onChangeCourseName = this.onChangeCourseName.bind(this);
        this.onChangeSection = this.onChangeSection.bind(this);
        this.onChangeSemester = this.onChangeSemester.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onCancel = this.onCancel.bind(this);

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
        console.log("onSubmit call");
        
        axios.delete('http://localhost:5000/courses/' 
            + this.props.match.params.id
        )
            .then(res => {
                console.log(res.data);
                this.props.history.push('/displayCourses');
            });

    }
    onCancel(e) {
        e.preventDefault();
        this.props.history.push('/displayCourses');
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
                                        disabled="disabled"
                                        value={this.state.course_code}
                                        onChange={this.onChangeCourseCode}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Course Name:</label>
                                    <input type="text"
                                        className="form-control"
                                        disabled="disabled"
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
                                        disabled="disabled"
                                        value={this.state.semester}
                                        onChange={this.onChangeSemester}
                                    />
                                </div>
                                <br />
                                <div>
                                    <button type="submit" className="btn btn-lg btn-primary btn-block">
                                        Confirm to Delete
                                    </button>
                                    <button type="cancel" onClick={this.onCancel} className="btn btn-lg btn-primary btn-block">
                                        Canclel
                                    </button>
                                </div>
                            </form>
                        </div>
                     </div>
                </div>
            </div>
        )
    }
}