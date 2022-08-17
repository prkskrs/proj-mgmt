import bigPromise from "../middleware/bigPromise.js"
import { mailHelper } from "../utils/mailHelper.js";
import crypto from "crypto";
import Task from "../models/Task.js";
import User from "../models/User.js";

export const createTask=bigPromise(async(req,res,next)=>{
    const {title,description,memberID,projectID,milestoneID}=req.body;
    if(!(title && description)){
        return res.status(400).json({
            success:"false",
            message:"title, description and projectId is required for task"
        })
    }

    const existingTask  = await Task.findOne({title})

    if(existingTask){
        return res.status(400).json({
            success:"false",
            message:"Task of this name already exists"
    })}
    const task= await Task.create({
        title,
        description,
        memberID,
        projectID,
        milestoneID
    })

    res.status(200).json({
        success:true,
        message:"Task Created Successfully!",
        task
    })

})

export const retrieveTask=bigPromise(async(req,res,next)=>{
    const task = await Task.find()
    return res.status(200).json({
        task
    })
})

export const retrieveTaskbyId=bigPromise(async(req,res,next)=>{
   const condition = {}
   console.log(req.query.projectId)
   if(req.query.projectId){
       condition.projectID=req.params.projectID
   }

   const task = await Task.findById(id)

   res.status(200).json({
       task
   })

})



export const updateTask=bigPromise(async(req,res,next)=>{
    res.send("updated Task")
})

