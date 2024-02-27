const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const bcrypt = require('bcrypt');

//desc Register user 
//@route Post /api/users/register
//@access private

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
//@access private

const loginUser = asyncHandler(async(req,res) => {
   const {email,password} = req.body;
   if(!email || !password){
       res.status(400);
       throw new Error('Please provide email and password');
   }
   const user = await User.findOne({email});
   //check if user exists and password is correct
   if(user && (await bcrypt.compare(password,user.password))){
    const accesstoken = jwt.sign({
        user:{
            username:user.username,
            email:user.email,
            id:user._id,
        },
    },process.env.ACCESS_TOKEN_SECRET,{expiresIn:'1m'});
    res.status(200).json({accesstoken});
   }else{
         res.status(401);
         throw new Error('Invalid email or password');
    }
});

//desc current user 
//@route Post /api/users/current
//@access private

const currentUser = asyncHandler(async(req,res) => {
    res.status(200).json(req.user);
});

module.exports = {registerUser,loginUser,currentUser};
