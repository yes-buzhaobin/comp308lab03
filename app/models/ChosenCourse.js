const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ChosenCourseSchema = new Schema({
    course: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Course'
    },
    my_section:{
        type:Number
    },
    student:{
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Student'
    }

})

mongoose.model('ChosenCourse', ChosenCourseSchema);
