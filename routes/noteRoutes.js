const express = require("express")
const notesRouter = express();
const auth = require("../middlewares/auth");
const { create, get, updatePost, deletePost, myPosts, getOne} = require("../controllers/notesController");


notesRouter.get("/getnote",auth,get) //all notes

notesRouter.get("/myposts",auth,myPosts)

notesRouter.get("/getone/:id",auth,getOne)

notesRouter.post("/createpost",auth,create)
notesRouter.put("/updatepost/:id", auth, updatePost)
notesRouter.delete("/deletepost/:id",auth,deletePost)










module.exports = notesRouter;