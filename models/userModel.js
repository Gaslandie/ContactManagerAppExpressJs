const mongoose = require('mongoose');
const { required } = require('nodemon/lib/config');

const userSchema = mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    username:{
        type:String,
        required:[true,'Please provide a name']
    },
    email:{
        type:String,
        required:[true,'Please provide an email'],
        unique:true
    },
    password:{
        type:String,
        required:[true,'Please provide a password'],
        minlength:[8,'Password must be at least 8 characters long'],
        validate:{
            validator:function(val){
                //at least one letter,capital and not, one number and one special character
                return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).*$/.test(val);
            },
            message:'Password must contain at least one letter and one number'
        }
    }
},{
    timestamps:true
});

module.exports = mongoose.model('User',userSchema);