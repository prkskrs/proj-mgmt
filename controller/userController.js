import User from "../models/User.js"
import bigPromise from "../middleware/bigPromise.js"
import { cookieToken } from "../utils/cookieToken.js";
import { mailHelper } from "../utils/mailHelper.js";
import crypto from "crypto";

export const signup=bigPromise(async(req,res,next)=>{
    const {name , email , password}=req.body;
    if(!email || !name || !password){
        return res.status(400).json({
            success:"false",
            message:"Name, Email and Password fields are required."
        })
    }

    const existingUser=await User.findOne({email});
    console.log(existingUser)
    if(existingUser){
        return res.status(400).json({
            success:"false",
            message:"User Already Exists"
        })
    }
    const user= await User.create({
        name,
        email:email.toLowerCase(),
        password:password
    })
    
    cookieToken(user,res,"Registered Successfully!");
})

export const login=bigPromise(async(req,res,next)=>{
    const {email,password}=req.body;
    if(!(email && password)){
        return res.status(400).json({
            success:"false",
            message:"Email and Password fields are required."
        })
    }
    const user=await User.findOne({email:email})

    if(!user){
        return res.status(400).json({
            success:"false",
            message:"You're not registered in our app"
        })
    }

    const isPasswordCorrect=await user.isValidatedPassword(password, user.password)

    if(!isPasswordCorrect){
        return res.status(401).json({
            success:"false",
            message:"Incorrect Password"
        })
    }

    cookieToken(user,res,"Loggined Successfully!");

})

export const logout=bigPromise(async(req,res,next)=>{
    res.cookie('token',null,{
        expires:new Date(Date.now()),
        httpOnly:true
    })
    res.status(200).json({
        success:true,
        message:"loggedOut Successfully"
    })
})

export const forgotPassword=bigPromise(async(req,res,next)=>{
    // get email
    const {email}=req.body;

    // find user in db
    const user=await User.findOne({email})

    // if user not found in database
    if(!user){
        return res.status(400).json({
            success:"false",
            message:"You're not registered in our app"
        })
    }
    
    // get forgot token from use model methods
    const forgotToken=await user.getForgotPasswordToken()

    // save user fields in db
    await user.save({validateBeforeSave:false})

    // creat a url
    const myUrl=`${req.protocol}://${req.get('host')}/api/v1/password/reset/${forgotToken}`

    // craft a message
    const message=`copy paste this link in your urls and hit enter \n\n ${myUrl}`

    // attempt to send mail
    try {
        await mailHelper({
            email:user.email,
            subject:"Project Dashboard - Password Reset Email",
            message:message
        })

        res.status(200).json({
            success:true,
            message:"Email Sent Successfully!"
        })
    } catch (error) {
        user.forgotPasswordToken=undefined,
        user.forgotPasswordExpiry=undefined,
        await user.save({validateBeforeSave:false})

        return res.status(500).json({
            error:error.message
        })
    }
})

export const forgotPasswordReset=bigPromise(async(req,res,next)=>{
    const token = req.params.token
    const encryptedToken=crypto.createHash("sha256").update(token).digest("hex")

    const user =await User.findOne({
        encryptedToken,
        forgotPasswordExpiry:{$gt : Date.now()}
    })

    if(!user){
        return res.status(400).json({
            success:"false",
            message:"Token is invalid or expired "
        })
    }

    if(req.body.password!== req.body.confirmPassword){
        return res.status(400).json({
            success:"false",
            message:"Password and confirmPassword do not matched"
        })
    }

    user.password=req.body.password
    user.forgotPasswordExpiry=undefined
    user.forgotPasswordToken=undefined
    await user.save()

    // send a json response or token
    cookieToken(user,res,"Password Reset Successfully")

})

export const getLoggedInUserDetails=bigPromise(async(req,res,next)=>{
    const user =await User.findById(req.user.id)

    res.status(200).json({
        success:true,
        user
    })
})

export const changePassword=bigPromise(async(req,res,next)=>{
    const userId=req.user.id;
    const user=await User.findById(userId).select("+password")

    const isCorrectPassword=await user.isValidatedPassword(req.body.oldpassword,user.password)
    if(!isCorrectPassword){
        return res.status(400).json({
            success:"false",
            message:"oldpassword is incorrect!"
        })
    }

    user.password=req.body.newpassword;
    await user.save()
    cookieToken(user,res,"Password Updated Successfully");

})

export const updateUserDetails=bigPromise(async(req,res,next)=>{

    const newData={
        name:req.body.name,   
        email:req.body.email
    }

    //also update user photo here
    //--


    const user = await User.findByIdAndUpdate(req.user.id,newData,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    })

    res.status(200).json({
        success:true,
        user
    })
})


export const adminAllUsers=bigPromise(async(req,res,next)=>{
    const users= await User.find()
    console.log(users)
    res.status(200).json({
        success:true,
        users
    })
})

export const adminGetOneUser=bigPromise(async(req,res,next)=>{

    const user= await User.findById(req.params.id)
    console.log(user)
    if(user){
        res.status(200).json({
            success:true,
            user
        })
    }
    else{
        res.status(401).json({
            success:false,
            message:"No user with this id exists"
        })
    }
})

export const adminUpdateOneUser=bigPromise(async(req,res,next)=>{
    
    if(!(req.body.email && req.body.name)) {
        return res.status(400).json({
            success:"false",
            message:"Name and Email fields are required."
        })
    }

    const newData={
        name:req.body.name,
        email:req.body.email,
        role:req.body.role
    }
    const user= await User.findByIdAndUpdate(req.params.id,newData,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    })

    // console.log(user)
    res.status(200).json({
        success:true,
        user
    })
})

export const adminDeleteAnyUser=bigPromise(async(req,res,next)=>{

    const user= await User.findById(req.params.id)

    console.log(user)

    if(!user){
        return res.status(401).json({
            success:false,
            message:"No user found with this id "
        })
    }
    await user.remove()
    res.status(200).json({
        success:true,
        message:"User Deleted Succesfully!",
        user
    })
})

export const adminUpdateById=bigPromise(async(req,res,next)=>{

})







