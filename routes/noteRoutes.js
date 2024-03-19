const express = require("express")
const notesRouter = express();
const auth = require("../middlewares/auth");
const { create, get, updatePost, deletePost, getNote, myPosts} = require("../controllers/notesController");


notesRouter.get("/getnote",auth,get) //all notes
// notesRouter.get("/:id",auth,getNote) //single note by id

notesRouter.get("/myposts",auth,myPosts)






notesRouter.post("/createpost",auth,create)
notesRouter.put("/updatepost/:id", auth, updatePost)
notesRouter.delete("/deletepost/:id",auth,deletePost)










module.exports = notesRouter;