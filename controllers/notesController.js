const notesModel = require("../models/notesModel");



const create = async(req,res)=>{
    const {title, description} = req.body;

    const newNote = new notesModel({
        title:title,
        description:description,
        userId : req.userId
    })
    try {
        await newNote.save();
      
        res.status(200).json({note:newNote})
    } catch (error) {
        console.error(error)
        res.status(400).json({msg:"something wen wrong"})
        
    }

}

const get = async(req,res)=>{
    
    posts = await notesModel.find({})
    console.log("notes",posts);
    res.json({posts:posts})


    
}
// const getNote = async(req,res)=>{
   
//     try {
//         let noteId = req.params.id
//         console.log(noteId);
//         if(!noteId){
//           res.status(400).json({msg:"provide id"})
//         }
//         let note = await notesModel.findById(noteId)
//         if(!note){
//           res.status(400).json({msg:"note not found"})
//         }
       
        
//         res.json({note})
        
//      } catch (error) {
//         console.error(error)
//         res.status(400).json({msg:"error updating"})
        
//      }

// }



const updatePost = async(req,res)=>{
 const{title,description} = req.body;

 try {
    let noteId = req.params.id
    console.log(noteId);
    if(!noteId){
      res.status(400).json({msg:"provide id"})
    }
    let note = await notesModel.findById(noteId)
    if(!note){
      res.status(400).json({msg:"note not found"})
    }
   
    let newNote = await note.updateOne({title:title,description:description})
    res.status(200).json({msg:"updated successflly"})
    
 } catch (error) {
    console.error(error)
    res.status(400).json({msg:"error updating the data"})
    
 }
 
 

}

const deletePost = async(req,res)=>{
    let id = req.params.id;
    try {
        let deleted = await notesModel.deleteOne({_id : id})
        console.log(deleted);
        if(deleted){
            res.status(200).json({msg:"deleted successfully."})
        }else{
            res.status(400).json({msg:"not found."})
        }
        
    } catch (error) {
        console.error(error)
        res.status(400).json({msg:"error deleting"})
    
        
    }
    
}


const myPosts=async(req,res)=>{
   const userID = req.userId;
   console.log(userID);
   const resp = await notesModel.find({userId:userID})
   console.log(resp);
   res.json({resp})



}

const getOne = async(req,res)=>{
   const postId = req.params.id
   const post = await notesModel.findById(postId)
   console.log(post);
   res.json(post);
}

module.exports = {
    create,
    get,
    getOne,
    
    updatePost,
    deletePost,
    myPosts
 
}