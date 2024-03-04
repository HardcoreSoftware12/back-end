const express = require("express");
const userRouter = require("./routes/userRoutes");
const  connect  = require("./db");
const notesRouter = require("./routes/noteRoutes");
const cookieParser = require("cookie-parser");
const app = express()
require("dotenv").config()
const PORT  =process.env.PORT || 3000



app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cookieParser());

app.use("/user",userRouter)
app.use("/notes",notesRouter)




connect(process.env.DB_USER, process.env.DB_PASSWORD);

app.get("/",(req,res)=>{
    res.send("api running")
})

app.listen(PORT,()=>{
    console.log("server started at port",PORT);
})