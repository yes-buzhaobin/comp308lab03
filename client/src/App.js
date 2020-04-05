import React, { Component } from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';

//import Menu from './components/menu';
import Navbar from './components/Navbar';
import Landing from './components/Landing';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';
import CourseList from './components/courses/CourseList';
import DisplayCourses from './components/courses/DisplayCourses';
import CreateCourse from './components/courses/CreateCourse';
import EditCourse from './components/courses/EditCourse';
import DeleteCourse from './components/courses/DeleteCourse';
import DropCourse from './components/studentCourses/DropCourse';
import EditSelectedCourse from './components/studentCourses/EditSelectedCourse';
import MyCourseList from './components/studentCourses/MyCourseList';
import SelectNewCourse from './components/studentCourses/SelectNewCourse';
import AddSelectedCourse from './components/studentCourses/AddSelectedCourse';
import ShowClass from './components/studentCourses/ShowClass';
import StudentList from './components/studentCourses/StudentList';
import StudentCourseList from './components/studentCourses/StudentCourseList';

class App extends Component {
  render(){
    return (
      <Router>
        <div className="App">
          <Navbar />
          <Route exact path="/" component={Landing} />
          <div className="container">
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/displayCourses" component={DisplayCourses} />
            <Route exact path="/course_list" component={CourseList} />
            <Route exact path="/createCourse" component={CreateCourse} />
            <Route exact path="/editCourse/:id" component={EditCourse} />
            <Route exact path="/deleteCourse/:id" component={DeleteCourse} />
            
            <Route exact path="/addSelectedCourse/:course_code" component={AddSelectedCourse} />  
            <Route exact path="/dropCourse/:course_code/students/:student_number" component={DropCourse} />     
            <Route exact path="/editSelectedCourse/:course_code/students/:student_number" component={EditSelectedCourse} />     
            <Route exact path="/myCourseList/" component={MyCourseList} />                  
            <Route exact path="/selectNewCourse" component={SelectNewCourse} />
            <Route exact path="/showClass/:course_code" component={ShowClass} />
            <Route exact path="/student_list" component={StudentList} />
            <Route exact path="/student_course_list/:student_number" component={StudentCourseList} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
