// Load the module dependencies
const mongoose = require('mongoose');
const Student = mongoose.model('Student');
const ChosenCourse = mongoose.model('ChosenCourse');

//
// Create a new error handling controller method
const getErrorMessage = function(err) {
	// Define the error message variable
	var message = '';

	// If an internal MongoDB error occurs get the error message
	if (err.code) {
		switch (err.code) {
			// If a unique index error occurs set the message error
			case 11000:
			case 11001:
				message = 'Student Number already exists';
				break;
			// If a general error occurs set the message error
			default:
				message = 'Something went wrong';
		}
	} else {
		// Grab the first error message from a list of possible errors
		for (const errName in err.errors) {
			if (err.errors[errName].message) message = err.errors[errName].message;
		}
	}

	// Return the message error
	return message;
};
// Create a new student
exports.create = function (req, res, next) {
	// Create a new instance of the 'Student' Mongoose model
	console.log("request body: " + req.body);
    var student = new Student(req.body); //get data from React form
    console.log("body: " + req.body.student_number);
	Student.findOne({
        email: req.body.email
    })
	.then(found =>{
		if (found) {	
			console.log("find One with same email, please change the email and try again. ");
			res.status(409).json({ message: 'The email already exists' });
		} else {
			// Use the 'Student' instance's 'save' method to save a new student document
			student.save(function (err) {
				if (err) {
					// Call the next middleware with an error message
					return res.status(400).send({
						message: getErrorMessage(err)
					});
				} else {
					// Use the 'response' object to send a JSON response
					res.status(201).json({student: student});
					
				}
			});
		}

	});
	
    
};
//
// Returns all students
exports.list = function (req, res, next) {
    // Use the 'Student' instance's 'find' method to retrieve a new student document
    Student.find({}, function (err, students) {
        if (err) {
			return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.json({students: students});
        }
    });
};
//
//'read' controller method to display a student
exports.read = function(req, res) {
	// Use the 'response' object to send a JSON response
	res.json({student: req.student});
};
//
// 'studentByID' controller method to find a student by its student_number
exports.studentByID = function (req, res, next, student_number) {
	// Use the 'Student' static 'findOne' method to retrieve a specific student
	Student.findOne({
        student_number: student_number
	}, (err, student) => {
		if (err) {
			// Call the next middleware with an error message
			return next(err);
		} else {
			if (student) {
				console.log("found student from db: "+student);
			} else {
				console.error("student not found by student_number")
			}
			// Set the 'req.student' property
            req.student = student;
            
			// Call the next middleware
			next();
		}
	});
};

// 'studentByEmail' controller method to find a student by its student email
exports.studentByEmail = function (req, res, next, email) {
	// Use the 'Student' static 'findOne' method to retrieve a specific student
	Student.findOne({
        email: email
	}, (err, student) => {
		if (err) {
			// Call the next middleware with an error message
			return next(err);
		} else {
			// Set the 'req.student' property
            req.student = student;
            console.log(student);
			// Call the next middleware
			next();
		}
	});
};

//update a student by id
exports.update = function(req, res, next) {
    console.log(req.body);
    Student.findByIdAndUpdate(req.student._id, req.body, function (err, student) {
      if (err) {
        console.log(err);
        return next(err);
      }
      res.json({student: student});
    });
};
// delete a student by id
exports.delete = function(req, res, next) {
    Student.findByIdAndRemove(req.student._id, req.body, function (err, student) {
      if (err) {
		return res.status(400).send({
			message: getErrorMessage(err)
		});
	  }
      res.status(204).json();
    });
};
//


//List all courses taken by a certain student
exports.listCourse = function (req, res, next){
    console.log("get courses by student number .....");
    
    ChosenCourse.find({
        student_number: req.params.student_number
    }).then( courses => {
        res.status(200).json({
            "courses": courses}
            );
    });
}

