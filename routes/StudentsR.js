const express = require('express');
const students = express.Router();
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const Student = require('../models/Student');
students.use(cors());

process.env.SECRET_KEY = 'password';

students.post('/register', (req, res) => {
    console.log("try to save....");
    console.log(req.body);
    const studentData = {
        student_number: req.body.student_number,
        password:req.body.password,
        first_name:req.body.first_name,
        last_name:req.body.last_name,
        address:req.body.address,
        city:req.body.city,
        phone_number:req.body.phone_number,
        email:req.body.email,
        program:req.body.program
    };
    Student.findOne({
        email:req.body.email
    })
    .then(student =>{
        if(!student) {
            bcrypt.hash(req.body.password, 10, (err,hash) => {
                studentData.password = hash;
                Student.create(studentData)
                .then(student => {
                    res.json({ status: student.email + ' registered!'});
                })
                .catch(err => {
                    res.send('error: ' + err);
                })
            })
        } else {
            console.log("find One with same email, please change the email and try again. ");
            res.json({ error: 'Student already exists' });
        }
    })
    .catch(error => {
        res.send('error: ' + error);
    })
})

students.post('/login', (req, res) => {
    let fetchStudent;
    Student.findOne({
        email: req.body.email
    })
    .then(student => {
        console.log("student email: " + student.email);
        if(student){
            console.log("student.first_name : " + student.first_name);
            console.log("student password: " + student.password);
            if(bcrypt.compareSync(req.body.password,student.password)){
                const payload = {
                    _id:student._id,
                    student_number:student.student_number,
                    first_name:student.first_name,
                    last_name:student.last_name,
                    address:student.address,
                    city:student.city,
                    phone_number:student.phone_number,
                    email:student.email,
                    program:student.program
                };
                fetchStudent = students;
                let token = jwt.sign(payload, process.env.SECRET_KEY, {
                    expiresIn: 1440
                });
                //res.send(token);
                res.status(200).json({
                    token: token,
                    student:student
                });
            } else {
                res.json({error: "Student does not exist first."});
            }
        } else {
            res.json({error: "Student does not exist second"})
        }
    })
    .catch(err => {
        res.send('error: ' + err);
    })
})

students.get('/profile', (req, res) => {
    var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY);

    Student.findOne({
        _id: decoded._id
    })
    .then(student => {
        if(student){
            res.json(student);
        } else {
            res.send(" Student does not exist.");
        }
    })
    .catch(err => {
        res.send('error: ' + err);
    })
})


const ConsoleLog = ({ children }) => {
    console.log(children);
    return false;
};

module.exports = students
