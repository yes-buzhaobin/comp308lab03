import React, { Component } from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';

//import Menu from './components/menu';
import Navbar from './components/Navbar';
import Landing from './components/Landing';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';
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
            <Route exact path="/createCourse" component={CreateCourse} />
            <Route exact path="/editCourse/:id" component={EditCourse} />
            <Route exact path="/deleteCourse/:id" component={DeleteCourse} />
            
            <Route exact path="/addSelectedCourse/:id" component={AddSelectedCourse} />  
            <Route exact path="/dropCourse/:id" component={DropCourse} />     
            <Route exact path="/editSelectedCourse/:id" component={EditSelectedCourse} />     
            <Route exact path="/myCourseList/" component={MyCourseList} />                  
            <Route exact path="/selectNewCourse" component={SelectNewCourse} />
            <Route exact path="/showClass/:course_code" component={ShowClass} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
