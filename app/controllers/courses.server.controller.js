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
    if (!course) {
        return res.status(404).json({"code": 404, 
											 "message": "the course "+course_code+" is not found."
											});
        }
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
    Course.findByIdAndUpdate(req.course.id, req.body, {new : true }, function (err, course) {
      if (err) {
        console.log(err);
        return next(err);
      }
      console.log(course);
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
        course: req.course.id,
    }).populate('course').populate('student').then( coursestudentList => {
        res.status(200).json({
            "coursestudentList": coursestudentList}
            );
    }).catch(err => {
        res.status(400).send('something wrong when query coursestudents list: ' + err);
    });
}

// get a student choose a course detail
exports.getStudent = function (req, res, next){
    console.log("get a course taken by a student ...");
    ChosenCourse.findOne({
        course: req.course.id,
        student: req.student.id
    }).populate('course').populate('student').then (coursestudent => {
        if(!coursestudent){
            res.status(404).send('Data is not found');            
        } else {            
            res.json({ "coursestudent": coursestudent});            
        }
    }).catch(err => {
        res.status(400).send("query student course registration failed: "+err);
    });
    
}


//add a Student under certain Course
exports.addStudent = function (req, res, next){
    console.log("try to save a chosen course....");
    console.log(req.body);
    const courseData = {
        course: req.course, 
        my_section:req.body.my_section,
        student: req.student
    };
    console.log(courseData);
    // check if already in db
    ChosenCourse.findOne({
        course: req.course.id,
        student: req.student.id
    }).then (course => {
        if(course){
            return res.status(400).send("this course "+req.course.course_code+" has been registered by this student " + req.student.email);
        }

        ChosenCourse.create(courseData)
        .then(coursestudent => {
            res.status(201).json({ "coursestudent": coursestudent});
        })
        .catch(err => {
            res.send('Adding course error: ' + err);
        });
    }).catch(err => {
        res.send('Adding course error: ' + err);
    });

}

//update  a Student section under certain Course
exports.updateStudent = function (req, res, next){
    console.log("update a course registration ...");
    console.log(req.body);
    ChosenCourse.findOne({
        course: req.course.id,
        student: req.student.id
    }).populate('course').populate('student').then (course => {
        if(!course){
            res.status(404).send('Data is not found');
            
        } else {
            course.my_section=req.body.my_section;
            course.save().then(coursestudent => {
                res.json({ "coursestudent": coursestudent});
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
    console.log("delete a course registration ...");
    console.log(req.body);
    ChosenCourse.findOne({
        course: req.course.id,
        student: req.student.id
    }).then (course => {
        if(!course){
            res.status(404).send('the course already been dropped.');
            
        } else {
            course.delete().then(result => {
                console.log(result);
                res.status(204).json({message: "student drop course success!"});
            });
        }
    }).catch(err => {
        res.status(400).send("query student course registration failed."+err);
    });
}
