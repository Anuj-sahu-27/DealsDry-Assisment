const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
  f_Image: {
    type: String,
    required: false // Assuming the image is optional
  },
  f_Name: {
    type: String,
    required: true
  },
  f_Email: {
    type: String,
    required: true,
    unique: true,
    match: /.+\@.+\..+/ // Email format validation
  },
  f_Mobile: {
    type: String,
    required: true,
    match: /^\d{10}$/ // Ensure it's a 10-digit number
  },
  f_Designation: {
    type: String,
    required: true
  },
  f_Gender: {
    type: String,
    required: true,
    enum: ['Male', 'Female', 'Other'] // Specify allowed values
  },
  f_Course: {
    type: String, // Store as an array of strings for multiple courses
    required: true
  },
  f_Createdate: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Employee', EmployeeSchema);
