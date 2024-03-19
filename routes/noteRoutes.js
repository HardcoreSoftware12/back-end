const express = require("express")
const notesRouter = express();
const auth = require("../middlewares/auth");
const { create, get, updatePost, deletePost, myPosts } = require("../controllers/notesController");


notesRouter.get("/getNote",auth,get)
notesRouter.get("/mypost",auth,myPosts)
notesRouter.post("/createpost",auth,create)
notesRouter.put("/updatepost", auth, updatePost)
notesRouter.delete("/deletepost",auth,deletePost)










module.exports = notesRouter;