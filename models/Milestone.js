import mongoose from "mongoose";
import validator from "validator";

const milestoneSchema=new mongoose.Schema({
    title:{
        type:String,
        required:[true,"Provide a title for your Milestone"]
    },
    contribution:{
        type:String,
        // required:[true,""]
    },
    start_date:{
        type:Date,
    },
    end_date:{
        type:Date,
    },
    status:{
        type:String,
        enum:["Active","Inactive"]
    },
    memberID:{
        type:mongoose.Types.ObjectId
    },
    projectID:{
        type:mongoose.Types.ObjectId
    }
})

const Milestone=mongoose.model("Milestone",milestoneSchema);

export default Milestone;