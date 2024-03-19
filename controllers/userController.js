const User = require("../models/userModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")


const register = async(req,res)=>{
    const {username,password,email} = req.body;
    // console.log(req.body.formData);
    console.log(username,password,email);
    //check user exist 
    try {
        
        const existingUser = await User.findOne({email:email})

        if(existingUser){
            return res.json({msg:"User already exists kindly login"})
        }

        hashedPassword = await bcrypt.hash(password,10)
        const user = await User.create({
            email:email,
            username:username,
            password:hashedPassword
        })
        // const secretKey = process.env.SECRET

        // const token = await jwt.sign({email:user.email, id:user._id},secretKey)
        res.status(200).json({user:user,msg:"Registerd Successfully"})


        
    } catch (error) {
        console.error("error registering the user",error);
        res.status(500).json({msg:"Sever error"})
        
    }
    
}


const login = async(req,res)=>{
  
    const {email, password} = req.body;
    // console.log(email,password);
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

        const cookieOptions = {
            httpOnly: true,
            domain: "localhost",
            secure: true, // Requires HTTPS
            sameSite: 'None', // Allows cross-site requests
            // Set other cookie attributes such as domain, path, expires, etc. if necessary
        };

        
        res.cookie("token",token) 
      
        res.status(200).json({token:token})
        
    } catch (error) {
        console.error("error registering the user",error);
        res.status(500).json({msg:"Sever error"})
        
    }
}


//to handle front end request to see is user is logged in or not.
const isLoggedIn = async(req,res)=>{
   
    let token = req.cookies.token
    // console.log(token,"token");
    try {
        if(token){
           
           
            let secretKey = process.env.SECRET
            const user = await jwt.verify(token,secretKey)
            // console.log(user);
            req.userId = user.id;
          
            res.json(true);

        }else{
            return res.json(false)
        }
      
        
    } catch (error) {
        console.error(error)
        res.status(400).json({msg:"unauthorized user catch"})

        
    }
}

const logout=(req,res)=>{
    console.log("code for logout");
    res.cookie("token",'',{
        httpOnly:true,
        expires:new Date(0)
    }).send();

}



module.exports = {
    register,
    login,
    isLoggedIn,
    logout
}