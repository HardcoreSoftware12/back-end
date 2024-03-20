const express = require("express")
const notesRouter = express();
const auth = require("../middlewares/auth");
const multer = require("multer");
const path =require('path')
// const upload = multer({ dest: 'uploads/' })
const { create, get, updatePost, deletePost, myPosts, getOne} = require("../controllers/notesController");
const notesModel = require("../models/notesModel")


// const uploadSingle = upload.single('photo')
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        // console.log(file);
      cb(null, Date.now() + path.extname(file.originalname));
    },
  });

  const upload = multer({ storage: storage });



notesRouter.get("/getnote",auth,get) //all notes

notesRouter.get("/myposts",auth,myPosts)

notesRouter.get("/getone/:id",auth,getOne)

notesRouter.post("/createpost",upload.single('photo'),auth,create)



notesRouter.put("/updatepost/:id",upload.single('photo'), auth, updatePost)
notesRouter.delete("/deletepost/:id",auth,deletePost)




module.exports = notesRouter;