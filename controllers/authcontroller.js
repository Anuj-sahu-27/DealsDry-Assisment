const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const  User = require('../models/user');

// Controller for registering a user
exports.registerUser = async (req, res) => {
  const { f_userName, f_Pwd } = req.body;
  console.log(f_userName)
  console.log(f_Pwd)
  try {
    let user = await User.findOne({ f_userName });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    user = new User({ f_userName, f_Pwd });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    user.f_Pwd = await bcrypt.hash(f_Pwd, salt);

    await user.save();
    res.status(201).json({ msg: 'User registered' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Controller for logging in a user
exports.loginUser = async (req, res) => {
  const { f_userName, f_Pwd } = req.body;
  console.log(f_userName)
  console.log(f_Pwd)
  try {
    const user = await User.findOne({ f_userName });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    const isMatch = await bcrypt.compare(f_Pwd, user.f_Pwd);
    console.log('User found:', user);
    console.log()
console.log('Stored hashed password:', user.f_Pwd);

    if (!isMatch) {
      console.error('Password comparison failed');
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    const payload = { userId: user.id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
