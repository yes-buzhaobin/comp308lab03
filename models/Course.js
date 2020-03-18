const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CourseSchema = new Schema({
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
    semester:{
        type:String
    }
})

module.exports = Course = mongoose.model('courses', CourseSchema)