import express from "express"
const router = express.Router()


// import controller 
import {createProject} from "../controller/projectController.js";

// import taskMiddlewares


// crud
router.route("/createProject").post(createProject)



// admin routes


export default router;