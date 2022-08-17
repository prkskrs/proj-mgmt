import bigPromise from "../middleware/bigPromise.js"
import { mailHelper } from "../utils/mailHelper.js";
import crypto from "crypto";
import Member from "../models/Member.js";

export const createMember=bigPromise(async(req,res,next)=>{
    const {name,email,userID}=req.body;
    if(!(name && email)){
        return res.status(400).json({
            success:"false",
            message:"name and email is required for member"
        })
    }

    const existingMember = await Member.findOne({email})

    if(existingMember){
        return res.status(400).json({
            success:"false",
            message:"member of this email already exists"
    })}

    const member= await Member.create({
        name,
        email,
        userID
    })

    res.status(200).json({
        success:true,
        message:"Member Created Successfully!",
        member
    })

})

export const retrieveMember=bigPromise(async(req,res,next)=>{
    res.statu(200).json({
        success:true,

    })
})


export const updateMember=bigPromise(async(req,res,next)=>{
    res.send("updated Member")
})

