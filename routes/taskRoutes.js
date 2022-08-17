import express from "express"
const router = express.Router()

// import controller 
import { createTask, retrieveTask, retrieveTaskbyId, updateTask } from "../controller/taskController.js"

// import taskMiddlewares

router.route("/createTask").post(createTask)
router.route("/retrieveTask").get(retrieveTask)
router.route("/updateTask").post(updateTask)
router.route("/retrieveTask/:id").get(retrieveTaskbyId)



// admin routes


export default router;