import React, { useState, useContext, useEffect } from "react";
import Notes from "./Notes";
import NoteContext from "../../context/note/NoteContext";
import AddNote from './AddNote';


export default function TextForm() {
    const context = useContext(NoteContext);
    const { fetchNotes } = context;
    useEffect(() => {
        fetchNotes();
    }, []);

    return (
        <>
            <AddNote />
            <Notes />

        </>
    );
}