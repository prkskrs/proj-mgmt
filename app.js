import express  from "express"
import  dotenv  from "dotenv"
dotenv.config();
const app=express()
import cookieParser from "cookie-parser"
import fileUpload from "express-fileupload";

//cookies and filemiddleware
app.use(cookieParser())
app.use(fileUpload())


// morgan middlewares
import morgan from "morgan"
app.use(morgan("tiny"))

// regular middlewares
app.use(express.json())
app.use(express.urlencoded({extended:true}))

// import all routes here
import userRoutes from "./routes/userRoutes.js"
import taskRoutes from "./routes/taskRoutes.js"
import projectRoutes from "./routes/projectRoutes.js"
import memberRoutes from "./routes/memberRoutes.js"
import milestoneRoutes from "./routes/milestoneRoutes.js"

// router middleware
app.use("/api/v1",userRoutes);
app.use("/api/v1",taskRoutes);
app.use("/api/v1",projectRoutes);
app.use("/api/v1",memberRoutes);
app.use("/api/v1",milestoneRoutes);


export default app;