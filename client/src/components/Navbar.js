import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import './Navbar.css';

class Navbar extends Component{
  constructor(){
    super();
    this.state = {
      menuItem:[
        {login:"Login"},
        {register: "Register"},
        {student: "Student"},
        {logout: "LogOut"},
        {displaycourses:"DisplayCourse"},
        {home: "Home"},
        {userName:""}
      ]
    }
  }
  
  componentDidMount(){
    this.setState({ userName : localStorage.studentName});
  }
    logOut(e) {
        e.preventDefault();
        //localStorage.setItem('studentName', "");
        localStorage.removeItem('studenttoken');
        localStorage.removeItem('studentName');
        localStorage.removeItem('email');
        localStorage.removeItem('studentNumber');

        this.props.history.push('/');
    }
    render() {
        const loginRegLink = (
            <ul className="navbar-nav mr-auto" >
                <li className="nav-item" >
                    <Link to="/login" className="my-nav-link">
                        Login
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/register" className="my-nav-link">
                        Register
                    </Link>
                </li>
            </ul>
        );

        //this.setState({ userName : localStorage.studentName});
        const workingLink = (
            <ul className="navbar-nav mr-auto">
                <li className="nav-name">
                    {this.state.userName}
                </li>
                <li className="nav-item">
                    <a href="/login" onClick={this.logOut.bind(this)} className="my-nav-link">
                        Logout
                    </a>
                </li>
            </ul>
        );

        const adminLink = (
            <ul className="navbar-nav">
                <li className="nav-item">
                    <Link to="/profile" className="my-nav-link">
                        Profile
                    </Link>
                </li>
                
                <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="/displayCourses" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Setup
                    </a>
                    <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                        <a className="dropdown-item" href="/createCourse">Add Course</a>
                        <a className="dropdown-item" href="/displayCourses">Display Courses</a>
                    </div>
                </li>
            </ul>
        );
        const studentLink = (
            <ul className="navbar-nav">
                <li className="nav-item">
                    <Link to="/profile" className="my-nav-link">
                        Profile
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/selectNewCourse" className="my-nav-link">
                        ChooseCourses
                    </Link>
                </li>
                
                <li className="nav-item">
                    <Link to="/myCourseList" className="my-nav-link">
                        MyCourses
                    </Link>
                </li>
            </ul>
        );
        return (
            <nav className="navbar navbar-dark navbar-expand bg-primary justify-content-between">
                
                <div className="d-flex flex-row bd-highlight mb-3 ustify-content-around" id="navbar1">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link to="/" className="my-nav-link">
                            Home
                            </Link>
                        </li>
                    </ul>
                    {localStorage.studenttoken && localStorage.email !== 'admin@yahoo.ca' ? studentLink : null}
                    { localStorage.email === 'admin@yahoo.ca' ? adminLink : null}
                </div>
                <div className="d-flex flex-reverse bd-highlight mb-3 ustify-content-around" id="navbar2">
                    {localStorage.studenttoken ? workingLink : loginRegLink}
                </div>
            </nav>
            
        );
    }

}

export default withRouter(Navbar)
