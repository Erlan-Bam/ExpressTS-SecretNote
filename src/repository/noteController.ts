import { verify } from "crypto";
import sequelize from "../database";
import { Note } from "../models/noteModel"

class NoteController{
    async createNote(req, res): Promise<String>{
        console.log("req body from controller", req.body);
        const { text, password } = req.body;
        const noteRepository = sequelize.getRepository(Note);
        const db_note = await noteRepository.create({
            text: text,
            hashed_password: password,
        });

        db_note.hashed_id = await Note.getHash(db_note.id);
        db_note.hashed_password = await Note.getHash(db_note.hashed_password);

        await db_note.save();
        
        let newNote = db_note.dataValues as Note;
        console.log(newNote);
        return newNote.hashed_id;
    };

    async findNoteById(hashed_id: string, res): Promise<Note>{
        const noteRepository = sequelize.getRepository(Note);
        let db_note = await noteRepository.findOne({
            where: {
                hashed_id: hashed_id,
            },
        });
        return db_note;
    };

    async getNote(req, res){
        const { id, password } = req.body;
        const note = await this.findNoteById(id, res);
        if(note == null){
            return await res.status(400).json({ message: "Incorrect ID" });
        }
        if(!note.verifyPassword(password)){
            return await res.status(400).json({ message: "Incorrect password" });
        }
        
        return note;
    }
}

export default new NoteController();