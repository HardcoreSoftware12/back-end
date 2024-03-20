const notesModel = require("../models/notesModel");



const create = async(req,res)=>{
    console.log(req.file);
    try {
        if (!req.file) {
            return res.status(400).json({ msg: "Please upload an image file" });
        }

        // Extract form data and image data
        const { title, description, smallDescription, category } = req.body;
        const imagePath = req.file.path;
        console.log(description.length);

        // Create new note instance with form data and image data
        const newNote = new notesModel({
            title: title,
            description: description,
            smallDescription: smallDescription,
            photo: imagePath,
            category: category,
            userId: req.userId
        });

        // Save the new note to the database
        await newNote.save();

        res.json({ note: newNote });
    } catch (error) {
        console.error(error);
        res.status(400).json({ msg: "Something went wrong" });
    }
   

}

const get = async(req,res)=>{
    
    posts = await notesModel.find({})
    // console.log("notes",posts);
    res.json(posts)


    
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
 

 try {
    const { title, description, smallDescription, category } = req.body;
    let imagePath = '';

    if (req.file) {
        imagePath = req.file.path;
    }

    let noteId = req.params.id;
    console.log(noteId);
    if (!noteId) {
        return res.json({ msg: "Provide ID" });
    }

    let note = await notesModel.findById(noteId);
    if (!note) {
        return res.json({ msg: "Note not found" });
    }

    // Update only the fields that are sent by the user
    if (title !== undefined) {
        note.title = title;
    }
    if (description !== undefined) {
        note.description = description;
    }
    if (smallDescription !== undefined) {
        note.smallDescription = smallDescription;
    }
    if (category !== undefined) {
        note.category = category;
    }
    if (imagePath) {
        note.photo = imagePath;
    }

    await note.save(); // Save the updated document

    res.status(200).json({ msg: "Updated successfully" });
    
 } catch (error) {
    console.error(error)
    res.json({msg:"error updating the data"})
    
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
   res.json(resp)



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