const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CourseSchema = new Schema({   

    course_code: {
        type: String,
        default: '',       
        trim: true,
        required: 'Course Code cannot be blank'
    },
    course_name: {
        type: String,
        default: '',
        trim: true,
        required: 'Course Name cannot be blank'
    },

    section: {
        type: Number,
        required: 'section cannot be blank'       
    },

    semester: {
        type: String,
        required: 'semester cannot be blank'       
    },

    
    created: {
        type: Date,
        default: Date.now
    },

    updated: {
        type: Date,
        default: Date.now
    },
});

mongoose.model('Course', CourseSchema);
