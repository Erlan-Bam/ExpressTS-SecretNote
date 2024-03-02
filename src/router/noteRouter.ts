import database from '../database';
import { Note } from '../models/noteModel'
import noteController from "../repository/noteController";

const express = require("express");
const router = express.Router();

router.post("/create-note", async (req, res) => {
    let note_id = await noteController.createNote(req,res);
    res.status(201).json({ note_id: note_id  });
});

router.get("/get-note", async (req, res) => {
    let note = await noteController.getNote(req, res);
    res.status(200).json({ note: note });
    note.destroy();
});

export default router