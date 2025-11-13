import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import validator from 'validator';

// Login User
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Validate required fields
    if (!email || !password) {
      return res.json({ success: false, message: 'Please provide both email and password' });
    }

    const user = await User.findOne({ where: { Email: email } });
    if (!user) return res.json({ success: false, message: 'User not found. Please check your email or sign up.' });

    const isMatch = await bcrypt.compare(password, user.Password);
    if (!isMatch) return res.json({ success: false, message: 'Invalid password. Please try again.' });
    
    // Get user ID - handle both user_id and id (Sequelize default)
    const userId = user.user_id || user.id || user.get('user_id') || user.get('id');
    const token = createToken(userId);
    res.json({ success: true, message: 'Login successful!', token: token });
  } catch (error) {
    console.error('Login error:', error);
    if (error.message && error.message.includes('JWT_S')) {
      return res.json({ success: false, message: 'Server configuration error. Please contact administrator.' });
    }
    res.json({ success: false, message: error.message || 'An error occurred during login. Please try again.' });
  }
};

const createToken = (id) => {
  const jwtSecret = process.env.JWT_S;
  if (!jwtSecret) {
    throw new Error('JWT_S environment variable is not set. Please configure it in .env file');
  }
  return jwt.sign({ id }, jwtSecret);
};

// register User
const registerUser = async (req, res) => {
  const { name, password, email } = req.body;
  try {
    // Validate required fields
    if (!name || !email || !password) {
      return res.json({ success: false, message: 'Please fill in all required fields (Name, Email, Password)' });
    }

    const exist = await User.findOne({ where: { Email: email } });
    if (exist) return res.json({ message: 'Email already Exist', success: false });

    // validating the email and the password using validator
    if (!validator.isEmail(email)) return res.json({ message: 'Enter a valid Email', success: false });
    if (password.length < 8) return res.json({ message: 'Please enter strong password (minimum 8 characters)', success: false });

    // hashing the password
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);

    const user = await User.create({ 
      user_name: name, 
      Email: email, 
      Password: hashedPass,
      Cart_data: {},
      Favorite_item: []
    });
    // Get user ID - handle both user_id and id (Sequelize default)
    const userId = user.user_id || user.id || user.get('user_id') || user.get('id');
    const token = createToken(userId);
    res.json({ success: true, message: 'Registration successful!', token: token });
  } catch (error) {
    console.error('Registration error:', error);
    // Provide more specific error messages
    if (error.name === 'SequelizeValidationError') {
      return res.json({ success: false, message: 'Validation error: ' + error.errors.map(e => e.message).join(', ') });
    }
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.json({ success: false, message: 'Email already exists' });
    }
    if (error.message && error.message.includes('JWT_S')) {
      return res.json({ success: false, message: 'Server configuration error. Please contact administrator.' });
    }
    res.json({ success: false, message: error.message || 'An error occurred during registration. Please try again.' });
  }
};

export { loginUser, registerUser };
