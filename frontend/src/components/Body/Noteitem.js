import React, { useContext } from 'react'
import NoteContext from "../../context/note/NoteContext";


export default function Noteitem(props) {
    const { note } = props;
    const context = useContext(NoteContext);
    const { editNote, deleteNote } = context;
    return (
        <div class="card my-2 mx-2" id={note._id}>
            <div class="card-header d-flex justify-content-between">
                <span className="badge bg-warning" style={{ color: "whitesmoke" }}>{note.tag}</span>
                <div>
                    <i class="fa-solid fa-trash-can mx-2" onClick={() => { deleteNote(note._id); }}></i>
                    <i class="fa-solid fa-file-pen mx-2" onClick={() => { editNote(note._id); }}></i>
                </div>
            </div>
            <div class="card-body">
                <h5 class="card-title">{note.title}</h5>
                <p class="card-text">{note.description}</p>
                <a href="#" class="btn btn-sm btn-primary">Go somewhere</a>
            </div>
        </div>
    )
}
