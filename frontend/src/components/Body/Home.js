import React, { useState, useContext, useEffect } from "react";
import Notes from "./Notes";
import NoteContext from "../../context/note/NoteContext";


export default function TextForm() {
    const context = useContext(NoteContext);
    const { addNote, fetchNotes } = context;

    const [newnote, setnewNote] = useState({ title: "", description: "", tag: "" })
    const onchange = (event) => {
        setnewNote({ ...newnote, [event.target.name]: event.target.value });
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        addNote(newnote);
        console.log(newnote)
    }
    useEffect(() => {
        fetchNotes();
    }, []);

    return (
        <>
            <div className="container">
                <h3> Add New Note </h3>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" className="form-control" id="title" onChange={onchange} name="title" required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <input type="text" className="form-control" onChange={onchange} name="description" id="description" required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label">Tag</label>
                        <input type="text" className="form-control" onChange={onchange} name="tag" id="tag" />
                    </div>
                    <button type="submit" className="btn btn-primary">Add Note</button>
                </form>
                <h3>Your Notes</h3>
                <Notes />
            </div>
        </>
    );
}