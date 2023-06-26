const { Router } = require("express");
const { NoteModel } = require("../Model/NoteModel.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const noteController = Router();

noteController.get("/", async (req, res) => {
  const notes = await NoteModel.find({ userId: req.body.userId });
  res.send(notes);
});

noteController.post("/create", async (req, res) => {
  const { Heading, Note, Tag, userId } = req.body;
  const note = new NoteModel({
    Heading,
    Note,
    Tag,
    userId,
  });
  try {
    await note.save();
    res.send("note created");
  } catch (err) {
    res.send("error creating note");
  }
});

noteController.delete("/delete/:noteId", async (req, res) => {
  const { noteId } = req.params;
  const delteItem = await NoteModel.findOneAndDelete({
    _id: noteId,
    userId: req.body.userId,
  });
  if (delteItem) {
    res.send("deleted");
  } else {
    res.send("can't delete");
  }
});

noteController.patch("/update/:noteId", async (req, res) => {
  const { noteId } = req.params;

  const updateItem = await NoteModel.findOneAndUpdate(
    { _id: noteId, userId: req.body.userId },
    { ...req.body }
  );
  if (updateItem) {
    res.send("updated");
  } else {
    res.send("can't update");
  }
});

module.exports = { noteController };
