const express = require("express")
const userRouter = express.Router()



userRouter.get("/register",(req,res)=>{
    console.log("register");
})


module.exports = userRouter;