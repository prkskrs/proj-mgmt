import app from "./app.js"
const PORT=process.env.PORT
import {connectDB} from "./config/db.js"

app.listen(PORT,()=>{
    console.log(`listening at port http://localhost:${PORT}`)
})