const students = require('../controllers/students.server.controller');
const courses = require('../controllers/courses.server.controller');
const auth = require('../controllers/auth.server.controller');
//
module.exports = function (app) {
        app.route('/api/courses')
            .get(courses.list)
            .post(auth.requiresLogin, courses.create);
        //
        app.route('/api/courses/:course_code')
            .get(courses.read)
            .put(auth.requiresLogin, auth.hasAuthorization, courses.update)
            .delete(auth.requiresLogin, auth.hasAuthorization, courses.delete);
        //
        app.param('course_code', courses.courseByID);


        //
        app.route('/api/courses/:course_code/students/:student_number') 
            .get(auth.requiresLogin,  courses.listStudent)
            .post(auth.requiresLogin,  courses.addStudent)           
            .put(auth.requiresLogin,  courses.updateStudent)
            .delete(auth.requiresLogin, courses.deleteStudent);
        app.param('student_number', students.studentByID);
};
