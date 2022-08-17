import mongoose from "mongoose";
import validator from "validator";

const taskSchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true,'Please Provide a title for your task.'],
        maxlength:[40,'Title should be under 40 characters.']
    },
    description:{
        type:String,
        required:[true,'Please Provide a brief description of your task.'],
        minlength:[50,"Description must be of minimum 50 characters."],
        maxlength:[200,"Description must be less than 200 characters. "]
    },
    start_date:{
        type:Date,
    },
    end_date:{
        type:Date,
    },
    end_time:{
        type:Date,
    },
    status:{
        type:String,
        enum:["Active","Inactive"]
    },
    memberID:[{
        type:mongoose.Types.ObjectId,
        ref:"Member"
    }],
    projectID:{
        type:mongoose.Types.ObjectId,
        ref:"Project"
    },
    milestoneID:{
        type:mongoose.Types.ObjectId,
        ref:"Milestone"
    }
})

const Task=mongoose.model("Task",taskSchema);

export default Task;