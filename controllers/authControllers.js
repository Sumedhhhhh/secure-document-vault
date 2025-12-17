const bcrypt = require('bcrypt');  
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
    // console.log("BODY:", req.body);
    // console.log("User model:", User);
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400).json({ error: "Email and password are required" });}
    
    try {
        const existingUser = await User.findOne({ email});
        if (existingUser) {
            return res.status(409).json({
                error : "User already exists",
            });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        email,
        password: hashedPassword,
    });

    res.status(201).json({
        message : "User registered successfully",
        userId : user._id,
        email : user.email, 
    });} catch (err){
        console.error("REGISTER ERROR:", err);
        return res.status(500).json({
            error: err.message,
            code: err.code,
    });
}

};

const login = async (req, res) => {
    const { email, password } = req.body;
    
    if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required" });}

    
    try {
        // Find user by email
        const user = await User.findOne({ email });
        if(!user) {
            return res.status(401).json({
                error : "Invalid email or password",
            });
        }

        // compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                error : "Invalid email or password",
            });
        }

        const token = jwt.sign(
            { userId : user._id},
            "supersecretkey",
            { expiresIn : "1h"}
        );

        return res.json({
            message : "Login successful",
            token,
        });
    }
    catch (err) {
        console.error("Login ERROR:", err);
        return res.status(500).json({
            error : "Server error",
        });
    }
};

module.exports = {
    register,
    login
};

