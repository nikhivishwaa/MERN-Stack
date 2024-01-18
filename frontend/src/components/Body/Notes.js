import React, { useContext, useRef, useState } from "react";
import NoteContext from "../../context/note/NoteContext";
import Noteitem from "./Noteitem";
import { NavLink } from "react-router-dom";

export default function Notes() {
    const context = useContext(NoteContext);
    const { notes, editNote } = context;
    const ref = useRef(null);
    const home = useRef(null);
    const [putNote, setPutNote] = useState({ title: "", description: "", tag: "" });

    const onchange = (event) => {
        setPutNote({ ...putNote, [event.target.name]: event.target.value });
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        editNote(putNote);
        setTimeout(() => {
            home.current.click();
        }, 200);
    };
    const updateNote = (value) => {
        setPutNote(value);
        ref.current.click();
    };

    return (
        <>
            <button
                ref={ref}
                type="button"
                className="btn btn-primary d-none"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
            >
                toggle button
            </button>

            {/* <!-- Modal --> */}
            <div
                className="modal fade"
                id="exampleModal"
                tabIndex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog">
                    <div className="modal-content  container my-2">
                        <form className="mt-4 mx-3">
                            <div className="mb-3">
                                <label htmlFor="etitle" className="form-label">
                                    Title
                                </label>
                                <input
                                    type="text"
                                    value={putNote.title}
                                    className="form-control"
                                    id="etitle"
                                    onChange={onchange}
                                    name="title"
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="edescription" className="form-label">
                                    Description
                                </label>
                                <input
                                    type="text"
                                    value={putNote.description}
                                    className="form-control"
                                    onChange={onchange}
                                    name="description"
                                    id="edescription"
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="etag" className="form-label">
                                    Tag
                                </label>
                                <input
                                    type="text"
                                    value={putNote.tag}
                                    className="form-control"
                                    onChange={onchange}
                                    name="tag"
                                    id="etag"
                                />
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    ref={home}
                                    className="btn btn-secondary"
                                    data-bs-dismiss="modal"
                                >
                                    Close
                                </button>
                                <button
                                    type="submit"
                                    onClick={handleSubmit}
                                    className="btn btn-primary"
                                    disabled={
                                        putNote.title.length < 3 || putNote.description.length < 3
                                    }
                                >
                                    Update
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className="row">
                {notes.map((note) => {
                    return (
                        <Noteitem key={note._id} updateNote={updateNote} note={note} />
                    );
                })}
            </div>
        </>
    );
}
