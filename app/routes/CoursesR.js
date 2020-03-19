const express = require('express');
const courses = express.Router();
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const Course = require('../models/Course');
courses.use(cors());

process.env.SECRET_KEY = 'password';

courses.post('/createCourse', (req, res) => {
    console.log("try to save a course....");
    console.log(req.body);
    const courseData = {
        course_code: req.body.course_code,
        course_name:req.body.course_name,
        section:req.body.section,
        semester:req.body.semester
    };
    Course.create(courseData)
    .then(student => {
        res.json({ status: 'A course added!'});
    })
    .catch(err => {
        res.send('Adding course error: ' + err);
    })
})

courses.post('/update/:id', (req, res) => {
    console.log("try to update a course....");
    console.log(req.body);
    Course.findById(req.params.id, function(err, course) {
        if(!course){
            res.status(404).send('Data is not found');
        } else {
            course.course_code = req.body.course_code;
            course.course_name=req.body.course_name;
            course.section=req.body.section;
            course.semester=req.body.semester;

            course.save().then(course => {
                res.json('A course updated.');
            })
            .catch(err => {
                res.status(400).send("Update not possible.");
            })
        }

    });
})

courses.get('/courses', (req, res) => {
    //var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY);
    console.log("getting courses");
    Course.find()
        .then( documents => {
            res.status(200).json({
                courses: documents
            })
        });
})
courses.get('/:id', (req, res) => {
    console.log("get course by id.....");
    
    let id = req.params.id;
    Course.findById(id, function(err,course){
        res.json(course);
    });
})

courses.get('/coursesByStudentId/:id', (req, res) => {
    console.log("get courses by student id.....");
    
    let id = req.params.id;
    Course.findById(id, function(err,course){
        res.json(course);
    });
})

courses.put('/:id', (req, res, next) => {
    console.log("put req.course " + req.course);
    //var courseIndex = req.body.course_code.indexOf(req.params.course_code);
    const course = new Course({
        _id:req.params.id,
        course_code: req.body.course_code,
        course_name: req.body.course_name,
        section: req.body.section,
        semester: req.body.semester
    });
    console.log('router.put by para id.' + req.params.id);
    Course.updateOne({_id:req.params.id}, course).then(result => {
        if(result){
            res.status(200).json({message: "Upadate successfully!"});
        } else {
            res.status(401).json({message:"Not authorized!"});
        }
    });
})

courses.delete("/:id", (req, res, next) => {
    console.log("Delete ...: " + req.params.id);
    
    Course.deleteOne({_id: req.params.id}).then(result => {
        console.log(result);
        res.status(200).json({message: "Course deleted!"});
    });
})


module.exports = courses
