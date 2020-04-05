// Load the 'students' controller
const students = require('../controllers/students.server.controller');
const auth = require('../controllers/auth.server.controller');

// Define the routes module' method
module.exports = function (app) {

    app.route('/api/students')
    .get(students.list)
    .post( students.create);
//
    app.route('/api/students/:student_number')
    .get(students.read)
    .put(auth.requiresLogin, students.update)
    .delete(auth.requiresLogin,  students.delete);

    app.route('/api/students/:student_number/courses') 
            .get(auth.requiresLogin,  students.listCourse)
//
app.param('student_number', students.studentByID);
    
};

