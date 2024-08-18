const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

//for register new user {public}
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({
            message: "Please enter all fields",
            data: false
        });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
        return res.status(400).json({
            message: "User already exists",
            data: false
        });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(password, salt);

    const user = await User.create({
        name,
        password: hashPass,
        email
    });

    if (user) {
        return res.status(201).json({
            message: "User registered successfully",
            data: [{
                id: user._id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id)
            }]
        });
    } else {
        return res.status(400).json({
            message: "Invalid data input",
            data: false
        });
    }
});


//for validate  user {public}
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
        return res.status(200).json({
            message: 'Login successful',
            data: [{
                id: user._id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id)
            }]
        });
    } else {
        return res.status(400).json({
            message: "Invalid credentials",
            data: false
        });
    }
});


//for get user data {private}
const userData = asyncHandler(async (req, res) => {
    // const { _id, name, email } = req.user;
    res.json({ data: req.user })
})

//generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}

module.exports = {
    registerUser,
    loginUser,
    userData
}