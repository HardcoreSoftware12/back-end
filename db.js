const mongoose = require("mongoose")


const connect = ()=>{
    const username = process.env.DB_USER;
    const password = process.env.DB_PASSWORD

    const uri = `mongodb+srv://${username}:${password}@cluster0.uuxrciw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

    mongoose.connect(uri)
    .then(()=>console.log("connected to database"))
    .catch((error)=>console.error("error connecting to database",error))
}


module.exports = connect