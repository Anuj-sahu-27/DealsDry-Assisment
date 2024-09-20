// /controllers/employeeController.js
const Employee = require('../models/employemodel');

// Create Employee
exports.createEmployee = async (req, res) => {
  const { f_Image, f_Name, f_Email, f_Mobile, f_Designation, f_Gender, f_Course } = req.body;

  // Validation
  if (!f_Name || !f_Email || !f_Mobile || !f_Designation || !f_Gender || !f_Course) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }

  try {
    // Check if email already exists
    let employee = await Employee.findOne({ f_Email });
    if (employee) {
      return res.status(400).json({ msg: 'Employee with this email already exists' });
    }

    // Create new employee
    employee = new Employee({
      f_Image,
      f_Name,
      f_Email,
      f_Mobile,
      f_Designation,
      f_Gender,
      f_Course
    });

    await employee.save();
    res.status(201).json({ msg: 'Employee created successfully', employee });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Get All Employees
exports.getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Delete Employee
exports.deleteEmployee = async (req, res) => {

    try {
        const employee = await Employee.findByIdAndDelete(req.params.id);
    
        if (!employee) {
          return res.status(404).json({ msg: 'Employee not found' });
        }
    
        res.json({ msg: 'Employee removed successfully' });
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
      }
};
