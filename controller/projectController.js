import bigPromise from "../middleware/bigPromise.js"
import { mailHelper } from "../utils/mailHelper.js";
import crypto from "crypto";
import Project from "../models/Project.js";

export const createProject=bigPromise(async(req,res,next)=>{
    const {name,projectType,memberID}=req.body;
    if(!(name && projectType)){
        return res.status(400).json({
            success:"false",
            message:"title and description is required for project"
        })
    }

    const existingProject = await Project.findOne({name})

    if(existingProject){
        return res.status(400).json({
            success:"false",
            message:"Project of this name already exists"
    })}

    const project= await Project.create({
        name,
        projectType,
        memberID
    })

    res.status(200).json({
        success:true,
        message:"Project Created Successfully!",
        project
    })

})
  
export const retrieveProject=bigPromise(async(req,res,next)=>{
    res.send("retrieved Project ")
})


export const updateProject=bigPromise(async(req,res,next)=>{
    res.send("updated Project")
})

