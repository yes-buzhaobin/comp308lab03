const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ChosenCourseSchema = new Schema({
    course_code:{
        type:String,
        required:true
    },
    course_name:{
        type:String
    },
    section:{
        type:String
    },
    my_section:{
        type:String
    },
    semester:{
        type:String
    },
    student_number:{
        type:String
    },
    email:{
        type:String
    }
})

module.exports = Course = mongoose.model('chosenCourses', ChosenCourseSchema)