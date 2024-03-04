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
    const notes = await notesModel.find({})
    console.log("notes",notes);
    res.json({notes:notes})

    
}

const updateNote = async(req,res)=>{
 const{title,description} = req.body;

 try {
    let noteId = req.query.id
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
    res.status(400).json({msg:"error updating"})
    
 }
 
 

}

const deleteNote = async(req,res)=>{
    let id = req.query.id;
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

module.exports = {
    create,
    get,
    updateNote,
    deleteNote
}