import express from "express"
const router = express.Router()

// import controller 
import {signup,login,logout,forgotPassword, forgotPasswordReset, getLoggedInUserDetails, changePassword, updateUserDetails, adminAllUsers, adminGetOneUser, adminUpdateOneUser, adminDeleteAnyUser} from "../controller/userController.js"
// import userMiddlewares
import {isLoggedIn,customRole} from "../middleware/userMiddlewares.js"

router.route("/signup").post(signup)
router.route("/login").post(login)
router.route("/logout").get(logout)
router.route("/forgotPassword").post(forgotPassword)
router.route("/password/reset/:token").post(forgotPasswordReset)
router.route("/userDashboard").get(isLoggedIn, getLoggedInUserDetails)
router.route("/password/update").post(isLoggedIn, changePassword)
router.route("/userDashboard/update").post(isLoggedIn, updateUserDetails)


// admin routes
router.route("/admin/users").post(isLoggedIn,customRole("admin"), adminAllUsers)
router
.route("/admin/users/:id")
.get(isLoggedIn,customRole("admin"), adminGetOneUser)
.put(isLoggedIn,customRole("admin"), adminUpdateOneUser)
.delete(isLoggedIn,customRole("admin"), adminDeleteAnyUser)


export default router;