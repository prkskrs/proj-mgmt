import express from "express"
const router = express.Router()


// import controller 
import {createMember} from "../controller/memberController.js";

// import memberMiddlewares


// crud
router.route("/createMember").post(createMember)



// admin routes


export default router;