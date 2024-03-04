const express = require("express");
const userRouter = require("./routes/userRoutes");
const  connect  = require("./db");
const notesRouter = require("./routes/noteRoutes");
const cookieParser = require("cookie-parser");
const app = express()
require("dotenv").config()
const PORT  =process.env.PORT || 3000
const cors = require("cors")



app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended:true}))
app.use(cookieParser());




app.use("/user",userRouter)
app.use("/notes",notesRouter)

app.get("/",(req,res)=>{
    res.send("Api by RANJIT")
})




connect(process.env.DB_USER, process.env.DB_PASSWORD);



app.listen(PORT,()=>{
    console.log("server started at port",PORT);
})