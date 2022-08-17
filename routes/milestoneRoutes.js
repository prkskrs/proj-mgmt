import express from "express"
const router = express.Router()


// import controller 
import {createMilestone} from "../controller/milestoneController.js";

// import memberMiddlewares


// crud
router.route("/createMilestone").post(createMilestone)



// admin routes


export default router;