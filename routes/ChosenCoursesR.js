const express = require('express');
const courses = express.Router();
const chosenCourses = express.Router();
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const ChosenCourse = require('../models/ChosenCourse');
const Course = require('../models/Course');
courses.use(cors());
chosenCourses.use(cors());

process.env.SECRET_KEY = 'password';

chosenCourses.post('/createChosenCourse', (req, res) => {
    console.log("try to save a chosen course....");
    console.log(req.body);
    const courseData = {
        course_code: req.body.course_code,
        course_name:req.body.course_name,
        section:req.body.section,
        my_section:req.body.my_section,
        semester:req.body.semester,
        student_number:req.body.student_number,
        email:req.body.email
    };
    console.log(courseData);
    ChosenCourse.create(courseData)
    .then(course => {
        res.json({ status: 'A chosen course added!'});
    })
    .catch(err => {
        res.send('Adding course error: ' + err);
    })
})

chosenCourses.post('/updateChosenCourse/:id', (req, res) => {
    console.log("try to update a course....");
    console.log(req.body);
    ChosenCourse.findById(req.params.id, function(err, course) {
        if(!course){
            res.status(404).send('Data is not found');
        } else {
            course.my_section=req.body.my_section;
            course.save().then(course => {
                res.json('A course updated.');
            })
            .catch(err => {
                res.status(400).send("Update not possible.");
            })
        }

    });
})

chosenCourses.get('/coursesByEmail/:email', (req, res) => {
    //var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY);
    //console.log("getting courses");
    let ans = [];
    Course.find()
        .then( documents => {
            ChosenCourse.find({
                email: req.params.email
            }).then( cCourses => {
                //console.log(documents);
                documents.forEach(d => {
                    const newCourse = {
                        _id:d._id,
                        course_code: d.course_code,
                        course_name:d.course_name,
                        selected:false,
                        section:d.section,
                        semester:d.semester
                    };
                    cCourses.forEach(c => {
                        if(d.course_code === c.course_code){
                            newCourse.selected = true;
                        }
                    });
                    ans.push(newCourse);
                });
                // console.log("print ans:");
                 console.log(cCourses);
                 console.log("cCOurse over");
                 console.log(documents);
               // console.log(ans);
                // console.log("print ans over:");
                
                res.status(200).json({
                    courses: ans
                });
            })
        });
})
chosenCourses.get('/getAllChosenCoursesByEmail/:email', (req, res) => {
    console.log("getting My course List");
    console.log("email = " + req.params);
    ChosenCourse.find({
        email: req.params.email
    }).then( cCourses => {
        console.log(cCourses);
        res.status(200).json({
            courses: cCourses
        });
    });
})

chosenCourses.get('/getStudents/:course_code', (req, res) => {
    console.log("get student by course code.....");
    
    ChosenCourse.find({
        course_code: req.params.course_code
    }).then( courses => {
        res.status(200).json({
            courses:courses}
            );
    });
})

chosenCourses.get('/:id', (req, res) => {
    console.log("get course by id.....");
    
    let id = req.params.id;
    ChosenCourse.findById(id, function(err,course){
        res.json(course);
    });
})

chosenCourses.get('/coursesByStudentId/:id', (req, res) => {
    console.log("get courses by student id.....");
    
    let id = req.params.id;
    ChosenCourse.findById(id, function(err,course){
        res.json(course);
    });
})

chosenCourses.delete("/:id", (req, res, next) => {
    console.log("Delete ...: " + req.params.id);
    
    ChosenCourse.deleteOne({_id: req.params.id}).then(result => {
        console.log(result);
        res.status(200).json({message: "Course deleted!"});
    });
})


module.exports = chosenCourses
