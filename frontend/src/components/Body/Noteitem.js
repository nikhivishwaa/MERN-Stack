import React, { useContext } from 'react'
import NoteContext from "../../context/note/NoteContext";


export default function Noteitem(props) {
    const { note, updateNote } = props;
    const context = useContext(NoteContext);
    const { deleteNote } = context;
    return (
        <div className="col-md-3">
            <div className="card my-2 mx-2" id={note._id}>
                <div className="card-header d-flex justify-content-between">
                    <span className="badge bg-warning" style={{ color: "whitesmoke" }}>{note.tag}</span>
                    <div>
                        <i className="fa-solid fa-trash-can mx-2" onClick={() => { deleteNote(note._id); }}></i>
                        <i className="fa-solid fa-file-pen mx-2" onClick={() => { updateNote(note); }}></i>
                    </div>
                </div>
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">{note.description}</p>
                    <a href="#" className="btn btn-sm btn-primary">Go somewhere</a>
                </div>

            </div>
        </div>
    )
}
