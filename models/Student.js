const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StudentSchema = new Schema({
    student_number:{
        type:String,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    first_name:{
        type:String
    },
    last_name:{
        type:String
    },
    address:{
        type:String
    },
    city:{
        type:String
    },
    phone_number:{
        type:String
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    program:{
        type:String
    }
})

module.exports = Student = mongoose.model('students', StudentSchema)