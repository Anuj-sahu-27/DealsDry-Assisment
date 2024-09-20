// /routes/employeeRoutes.js
const express = require('express');
const router = express.Router();
const { createEmployee, getAllEmployees, deleteEmployee } = require('../controllers/employecontroller');

// @route   POST /employees
// @desc    Create a new employee
router.post('/createemploye', createEmployee);

// @route   GET /employees
// @desc    Get all employees
router.get('/getemploye', getAllEmployees);

// @route   DELETE /employees/:id
// @desc    Delete an employee by ID
router.delete('/remove/:id', deleteEmployee);

module.exports = router;
