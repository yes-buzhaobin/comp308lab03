const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ChosenCourseSchema = new Schema({
    course_code: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Course'
    },
    course_name:{
        type:String
    },
    section:{
        type:Number
    },
    my_section:{
        type:Number
    },
    semester:{
        type:String
    },
    student_number:{
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Student'
    },
    email:{
        type:String
    }
})

mongoose.model('ChosenCourse', ChosenCourseSchema);
