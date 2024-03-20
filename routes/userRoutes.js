const express = require("express");
const { register, login,isLoggedIn,logout, getUser, getUserById} = require("../controllers/userController");
const userRouter = express.Router()


userRouter.get("/",(req,res)=>{
    res.send("API by ranjit");
})

userRouter.post("/register",register)
userRouter.post("/login",login)
userRouter.get("/logout",logout)
userRouter.get("/isLoggedIn",isLoggedIn)
userRouter.get("/getuser",getUser)
userRouter.get("/getuserbyid/:id",getUserById)


module.exports = userRouter;