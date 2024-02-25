const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

//desc Register user 
//@route Post /api/users/register
//@access public

const registerUser = asyncHandler(async(req,res) => {
    const {username,email,password} = req.body;
    if(!username || !email || !password){
        res.status(400);
        throw new Error('Please fill all the fields');
    }
    const userAvailable = await User.findOne({email});
    if(userAvailable){
        res.status(400);
        throw new Error('User already exists');
    }
    console.log("username",username);
    //hash password before saving to database
    const hashedPassword = await bcrypt.hash(password,10);
    console.log("hashed password",hashedPassword);
    const user = await User.create({username,email,hashedPassword});
    res.json({message:"user registered successfully",user})
});
//desc login user 
//@route Post /api/users/login
//@access public

const loginUser = asyncHandler(async(req,res) => {
    res.json({message:" user login controller"})
});

//desc current user 
//@route Post /api/users/current
//@access public

const currentUser = asyncHandler(async(req,res) => {
    res.json({message:"current user controller"})
});

module.exports = {registerUser,loginUser,currentUser};
