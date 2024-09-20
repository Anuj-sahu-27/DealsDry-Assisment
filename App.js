const express = require('express');
const connectDB = require('./config/databaseconnection'); // Assuming you have a database config
const dotenv = require('dotenv');


// Load environment variables
dotenv.config();

const app = express();

//connect database
connectDB();
const cors = require('cors');
app.use(cors());


// Middleware to parse JSON
app.use(express.json());

// Import routes
const authRoutes = require('./routes/authroutes');
const employeroutes=require('./routes/employeroutes')

// Use routes
app.use('/api/v1', authRoutes);
app.use('/api/v1',employeroutes)

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
//this is default route
app.get('/',(req,res)=>{
    
    res.send("APP IS WORKING FINE")
})
