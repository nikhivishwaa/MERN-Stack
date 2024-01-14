import React, { useContext } from 'react'
import NoteContext from "../../context/note/NoteContext";
import Noteitem from './Noteitem';


export default function Notes() {
    const context = useContext(NoteContext);
    const { notes, setNotes } = context;
    return (
        <div className='row'>
            {notes.map((note) => {
                return (
                    <div className="col-md-3">
                        <Noteitem note={note} />
                    </div>
                );
            })}
        </div>
    )
}
