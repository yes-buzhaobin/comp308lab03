const mongoose = require('mongoose');
const Course = mongoose.model('Course');
const ChosenCourse = mongoose.model('ChosenCourse');

//
function getErrorMessage(err) {
    if (err.errors) {
        for (let errName in err.errors) {
            if (err.errors[errName].message) return err.errors[errName].
                message;
        }
    } else {
        return 'Unknown server error';
    }
};

//
exports.create = function (req, res, next) {
	// Create a new instance of the 'Student' Mongoose model
	console.log("request body: " + req.body);
    var course = new Course(req.body); //get data from React form  

    // Use the 'Student' instance's 'save' method to save a new student document
    course.save(function (err) {
        if (err) {
            // Call the next middleware with an error message
            return next(err);
        } else {
            // Use the 'response' object to send a JSON response
            res.status(201).json({"course": course});
            
        }
    });
};
//
exports.list = function (req, res) {
    Course.find().sort('-created').exec((err, courses) => {
if (err) {
        return res.status(400).send({
            message: getErrorMessage(err)
        });
    } else {
        res.status(200).json({"courses": courses});
    }
});
};
//
exports.courseByID = function (req, res, next, course_code) {
    Course.findOne({
        course_code: course_code
	}, (err, course) =>{
		if (err) {
			// Call the next middleware with an error message
			return next(err);
		}
    if (!course) return next(new Error('Failed to load course '
            + course_code));
        req.course = course;
        console.log('in course By CourseCode:', req.course)
        next();
    });
};
//
exports.read = function (req, res) {
    res.status(200).json({"course": req.course});
};

//update a course by course code
exports.update = function(req, res, next) {
    console.log(req.body);
    Course.findByIdAndUpdate(req.course.id, req.body, function (err, course) {
      if (err) {
        console.log(err);
        return next(err);
      }
      res.json({"course": course});
    });
};

//
exports.delete = function (req, res) {
    const course = req.course;
    course.remove((err) => {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.status(204).json();
        }
    });
};


//List all students under certain Course
exports.listStudent = function (req, res, next){
    console.log("get student by course code.....");
    
    ChosenCourse.find({
        course_code: req.params.course_code
    }).then( courses => {
        res.status(200).json({
            "courses": courses}
            );
    });
}

//add a Student under certain Course
exports.addStudent = function (req, res, next){
    console.log("try to save a chosen course....");
    console.log(req.body);
    const courseData = {
        course_code: req.course.course_code,
        course_name:req.course.course_name,
        section:req.course.section,
        my_section:req.body.my_section,
        semester:req.course.semester,
        student_number:req.student.student_number,
        email:req.student.email
    };
    console.log(courseData);
    ChosenCourse.create(courseData)
    .then(course => {
        res.json({ status: 'A course has been added!'});
    })
    .catch(err => {
        res.send('Adding course error: ' + err);
    })
}

//update  a Student section under certain Course
exports.updateStudent = function (req, res, next){
    console.log("update a course registration ...");
    console.log(req.body);
    ChosenCourse.find_one({
        course_code: req.course.course_code,
        student_number: req.student.student_number
    }).then (course => {
        if(!course){
            res.status(404).send('Data is not found');
            
        } else {
            course.my_section=req.body.my_section;
            course.save().then(course => {
                res.json('A student course registration updated.');
            })
            .catch(err => {
                res.status(400).send("student course registration Update failed: "+ err);
            })
        }
    }).catch(err => {
        res.status(400).send("query student course registration failed."+err);
    });

    
}

//delete Student under certain Course
exports.deleteStudent = function (req, res, next){
    console.log("update a course registration ...");
    console.log(req.body);
    ChosenCourse.find_one({
        course_code: req.course.course_code,
        student_number: req.student.student_number
    }).then (course => {
        if(!course){
            res.status(404).send('the course already been dropped.');
            
        } else {
            course.my_section=req.body.my_section;
            course.delete().then(result => {
                console.log(result);
                res.status(200).json({message: "student drop course success!"});
            });
        }
    }).catch(err => {
        res.status(400).send("query student course registration failed."+err);
    });
}
