const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const bcrypt = require('bcrypt');

//desc Register user 
//@route Post /api/users/register
//@access public

const registerUser = asyncHandler(async(req,res) => {
   
    const {username,email,password} = req.body;
    const userExists = await User.findOne({email});
    if(userExists){
        res.status(400);
        throw new Error('User already exists');
    }
    //validate password before hashing
    const tempUser = new User({username,email,password});
    const validationError = tempUser.validateSync();
    if(validationError){
        res.status(400);
        throw new Error(validationError.message);
    }
    //hash password
    const hashedPassword = await bcrypt.hash(password,10);

    //create user with hashed password
    const user = await User.create({username:username,
                                    email:email,
                                    password:hashedPassword});
    if(user){
        res.status(201).json({
            _id:user._id,
            username:user.username,
            email:user.email
        })
    }else{
        res.status(400);
        throw new Error('Invalid user data');
    }
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
