const express = require("express");
const userRouter = require("./routes/userRoutes");
const  connect  = require("./db");
const app = express()
require("dotenv").config()
const PORT  =process.env.PORT || 3000



app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use("/user",userRouter)


connect(process.env.DB_USER, process.env.DB_PASSWORD);

app.listen(PORT,()=>{
    console.log("server started at port",PORT);
})