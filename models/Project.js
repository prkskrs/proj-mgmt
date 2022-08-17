import mongoose from "mongoose";
import validator from "validator";

const projectSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Please Provide a name for your task.'],
        maxlength:[40,'Name should be under 40 characters.']
    },
    projectType:{
        type:String,
        required:[true,'Provide type of your project.'],
    },
    description:{
        type:String,
        // required:[true,"Please provide a description of your task."],
        minlength:[50,"Description must be of minimum 50 characters."],
        maxlength:[200,"Description must be less than 200 characters. "]
    },
    tools:{
        type:String,
        // required:[true,"Please provide tools used in your project."]
    },
    domain:{
        type:String,
        // required:[true,"Please provide domain of your task."]
    },
    status:{
        type:String,
        enum:["Active","Inactive"]
    },
    progress:{
        type:String,
        enum:["Completed","In Hold","In Progress","Incomplete","New","Open"],
        default: 'New'
    },
    memberID:[{
        type:mongoose.Types.ObjectId,
        ref:"Member"
    }],
})

const Project=mongoose.model("Project",projectSchema);

export default Project;