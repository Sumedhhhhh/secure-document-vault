const bcrypt = require('bcrypt');  
const User = require('../models/User');

const register = async (req, res) => {
    console.log("BODY:", req.body);
    console.log("User model:", User);
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

const login = (req, res) => {
    const { email, password } = req.body;
    
    if (!email || !password) {
        res.status(400).json({ error: "Email and password are required" });}
    res.json({
        message : "User logged in",
        email,});
};

module.exports = {
    register,
    login
};

