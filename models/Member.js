import mongoose from "mongoose";
import validator from "validator";

const memberSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Please provide a name'],
        maxlength:[40,'Name should be under 40 characters.']        
    },
    email:{
        type:String,
        required:true,
        validate:[validator.isEmail,'Please enter email in correct format'],
        unique:true
    },
    role:{
        type: [{
            type: String,
            enum: ['Leader', 'Member']
        }],
        // required:true,
        default: ['Member']
    },
    image:{
        id:{
            type:String,
        },
        secure_url:{
            type:String,
        }
    },
    phone:{
        type: Number,
        validate: {
            validator: function(v) {
                return /d{10}/.test(v);
            },
            message: '{VALUE} is not a valid 10 digit number!'
        }
    },
    address:{
        type:String,
        // required:true
    },
    github:{
        type:String,
        // required:true
    },
    linkedIn:{
        type:String,
        // required:true
    },
    userID:{
        type:mongoose.Types.ObjectId,
        ref:"User"
    }
})

const Member=mongoose.model("Member",memberSchema);

export default Member;