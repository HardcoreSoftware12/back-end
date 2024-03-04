const express = require("express")
const notesRouter = express();
const auth = require("../middlewares/auth");
const { create, get, updateNote, deleteNote } = require("../controllers/notesController");


notesRouter.get("/getNote",auth,get)
notesRouter.post("/createNote/",auth,create)
notesRouter.put("/updateNote", auth, updateNote)
notesRouter.delete("/deleteNote",auth,deleteNote)










module.exports = notesRouter;