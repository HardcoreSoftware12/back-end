const mongoose = require("mongoose")


const noteSchema = mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    smallDescription:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    photo:{
        
        type:String,
        required:true

    },
    category:{
        type:String,
        required:true
    },
    userId:{//Id of the user
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    }
},{timestamps: true})

module.exports = mongoose.model("Note",noteSchema);