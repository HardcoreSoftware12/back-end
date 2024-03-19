const express = require("express")
const notesRouter = express();
const auth = require("../middlewares/auth");
const multer = require("multer");
// const upload = multer({ dest: 'uploads/' })
const { create, get, updatePost, deletePost, myPosts, getOne} = require("../controllers/notesController");


// const uploadSingle = upload.single('photo')



notesRouter.get("/getnote",auth,get) //all notes

notesRouter.get("/myposts",auth,myPosts)

notesRouter.get("/getone/:id",auth,getOne)

notesRouter.post("/createpost",auth,create)
notesRouter.put("/updatepost/:id", auth, updatePost)
notesRouter.delete("/deletepost/:id",auth,deletePost)










module.exports = notesRouter;