const User = require("../models/userModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")


const register = async(req,res)=>{
    const {username,password,email} = req.body;
    //check user exist 
    try {
        
        const existingUser = await User.findOne({email:email})

        if(existingUser){
            return res.status(400).json({msg:"User already exists kindly login"})
        }

        hashedPassword = await bcrypt.hash(password,10)
        const user = await User.create({
            email:email,
            username:username,
            password:hashedPassword
        })
        // const secretKey = process.env.SECRET

        // const token = await jwt.sign({email:user.email, id:user._id},secretKey)
        res.status(200).json({user:user})

        
    } catch (error) {
        console.error("error registering the user",error);
        res.status(500).json({msg:"Sever error"})
        
    }
    
}


const login = async(req,res)=>{
    const {email, password} = req.body;
    if(!email || !password){
        return res.status(400).json({msg:"enter email and password"})
    }
    try {
        const existingUser = await User.findOne({email:email})
        if(!existingUser){
            return res.status(400).json({msg:"user not found register"})
        }
        const passwordMatch = await bcrypt.compare(password,existingUser.password)
        if(!passwordMatch){
            return res.status(400).json({msg:"invalid credentials"})

        }

        const secretKey = process.env.SECRET
        const token = await jwt.sign({email:existingUser.email, id:existingUser._id},secretKey)

        
        // res.cookie("token",token,{
        //     maxAge:10000
        // });
        res.status(200).json({user:existingUser, token:token})
        
    } catch (error) {
        console.error("error registering the user",error);
        res.status(500).json({msg:"Sever error"})
        
    }
}

module.exports = {
    register,
    login
}