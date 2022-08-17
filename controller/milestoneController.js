import bigPromise from "../middleware/bigPromise.js"
import { mailHelper } from "../utils/mailHelper.js";
import crypto from "crypto";
import Milestone from "../models/Milestone.js";

export const createMilestone=bigPromise(async(req,res,next)=>{
    const {title,memberID,projectID}=req.body;
    if(!(title)){
        return res.status(400).json({
            success:"false",
            message:"title is required for project"
        })
    }

    const existingMilestone = await Milestone.findOne({title})

    if(existingMilestone){
        return res.status(400).json({
            success:"false",
            message:"milestone of this name already exists"
    })}

    const milestone= await Milestone.create({
        title,
        memberID,
        projectID
    })

    res.status(200).json({
        success:true,
        message:"Milestone Created Successfully!",
        milestone
    })

})

export const retrieveMilestone=bigPromise(async(req,res,next)=>{
    res.send("retrieved Milestone")
})


export const updateMilestone=bigPromise(async(req,res,next)=>{
    res.send("updated Milestone")
})

