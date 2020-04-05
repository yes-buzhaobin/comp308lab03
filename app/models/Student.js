// Load the module dependencies
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
//Define a schema
const Schema = mongoose.Schema;
//
// Define a new 'StudentSchema'
var StudentSchema = new Schema({

	student_number: {
		type: Number,
		// Set a unique 'student_number' index
		unique: true,
		// Validate 'student_number' value existance
		required: 'student_number is required',
		// Trim the 'student_number' field
		trim: true
	},

	password: {
		type: String,
		// Validate the 'password' value length
		validate: [
			(password) => password && password.length >= 6,
			'Password should be longer'
		]
	},

	first_name: String,
	
	last_name: String,

	address: String,

	city: String,

	phone_number: String,
	
	email: {
        type: String,
        unique: true,
		// Validate the email format
		match: [/.+\@.+\..+/, "Please fill a valid email address"]
	},

	program: String,

	
	created: {
        type: Date,
        default: Date.now
    },

    updated: {
        type: Date,
        default: Date.now
    }
	
	
});

// Set the 'fullname' virtual property
StudentSchema.virtual('fullName').get(function() {
	return this.first_name + ' ' + this.last_name;
}).set(function(fullName) {
	const splitName = fullName.split(' ');
	this.first_name = splitName[0] || '';
	this.last_name = splitName[1] || '';
});

// Use a pre-save middleware to hash the password
// before saving it into database
StudentSchema.pre('save', function(next){
	//hash the password before saving it
	this.password = bcrypt.hashSync(this.password, saltRounds);
	next();
});

// Create an instance method for authenticating student
StudentSchema.methods.authenticate = function(password) {
	//compare the hashed password of the database 
	//with the hashed version of the password the student enters
	return this.password === bcrypt.hashSync(password, saltRounds);
};


// Configure the 'StudentSchema' to use getters and virtuals when transforming to JSON
StudentSchema.set('toJSON', {
	getters: true,
	virtuals: true
});

// Create the 'Student' model out of the 'StudentSchema'
mongoose.model('Student', StudentSchema);