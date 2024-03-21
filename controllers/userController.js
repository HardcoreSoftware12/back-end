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
        res.json({msg:"Registerd Successfully"})


        
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
            return res.json({msg:"user not found register"})
        }
        const passwordMatch = await bcrypt.compare(password,existingUser.password)
        if(!passwordMatch){
            return res.json({msg:"invalid credentials"})

        }

        const secretKey = process.env.SECRET
        const token = await jwt.sign({email:existingUser.email, id:existingUser._id,username:existingUser.username},secretKey)

        const cookieOptions = {
            httpOnly: true,
            domain: "https://back-end-mr6o.onrender.com",
            secure:true,
            sameSite: 'None', // Allows cross-site requests
            path:"/"
        };

        
        res.cookie("token",token,cookieOptions) 
      
        // res.json({token:token})
        res.json({msg:'user loggedIn'})
        
    } catch (error) {
        console.error("error registering the user",error);
        res.status(500).json({msg:"Sever error"})
        
    }
}


//to handle front end request to see is user is logged in or not.
const isLoggedIn = async(req,res)=>{
   
    let token = req.cookies.token
    console.log(token,"token is logged In");
    try {
        if(token){
           
           
            let secretKey = process.env.SECRET
            const user = await jwt.verify(token,secretKey)
            // console.log(user);
            // req.userId = user.id; 
          
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

const getUser = async(req,res)=>{
    const token = req.cookies.token;
    try {
        if(token){
            let secretKey = process.env.SECRET;
            const user = jwt.verify(token,secretKey)
            console.log(user);
            res.json(user)
        }
    } catch (error) {
        
        console.error(error)
    }
}

const getUserById = async(req,res)=>{
    const id = req.params.id;
    try {
      if(id){
        const user = await User.findById(id);
        return res.json(user)

      }
    } catch (error) {
        console.error(error)
    }
}



module.exports = {
    register,
    login,
    isLoggedIn,
    logout,
    getUser,
    getUserById
}