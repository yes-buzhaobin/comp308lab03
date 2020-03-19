const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CourseSchema = new Schema({
    course_code:{
        type:String,
        unique: true,
        required:true
    },
    course_name:{
        type:String
    },
    section:{
        type:Number
    },
    semester:{
        type:String
    }
})

module.exports = Course = mongoose.model('courses', CourseSchema)