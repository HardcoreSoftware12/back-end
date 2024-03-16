const express = require("express");
const { register, login,isLoggedIn,logout} = require("../controllers/userController");
const userRouter = express.Router()


userRouter.get("/",(req,res)=>{
    res.send("API by ranjit");
})

userRouter.post("/register",register)
userRouter.post("/login",login)
userRouter.get("/logout",logout)
userRouter.get("/isLoggedIn",isLoggedIn)


module.exports = userRouter;