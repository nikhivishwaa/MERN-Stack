import { useState } from 'react';
import NoteContext from './NoteContext';


// const NoteState = (props) => {
//     const state = {
//         "name": "nikhil",
//         "roll": "admin"
//     }
//     return (
//         <NoteContext.Provider value={state}>
//             {/* these state will be available to all components under NoteContext */}
//             {props.children}
//         </NoteContext.Provider>
//     );
// }

const host = 'http://localhost:4500';


const NoteState = (props) => {
    const [notes, setNotes] = useState([]);

    const fetchNotes = async ()=>{
        const notelist = await fetch(`${host}/api/notes/all/`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVhNDM1OTA1MWI3ODI3OWQ2MThlOTQ1In0sImlhdCI6MTcwNTI2MDQzMn0.UPAHX4NHCR9TFBVVYJlrUDxu4c9Jt5yOWHU-aPLOTV4"
            },
        });
        const noteInitial = await notelist.json();
        setNotes(noteInitial);
    }

    const addNote = async (newNote) => {
        console.log("add note", newNote);
        const data = await fetch(`${host}/api/notes/new/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVhNDM1OTA1MWI3ODI3OWQ2MThlOTQ1In0sImlhdCI6MTcwNTI2MDQzMn0.UPAHX4NHCR9TFBVVYJlrUDxu4c9Jt5yOWHU-aPLOTV4"
            },
            body: JSON.stringify(newNote)
        });
        const jsonData = await data.json();
        console.log(jsonData);
        setNotes(notes.concat(jsonData));
    }
    
    const editNote = async (id, note={}) => {
        const data = await fetch(`${host}/api/notes/change/${id}/`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVhNDM1OTA1MWI3ODI3OWQ2MThlOTQ1In0sImlhdCI6MTcwNTI2MDQzMn0.UPAHX4NHCR9TFBVVYJlrUDxu4c9Jt5yOWHU-aPLOTV4"
            },
            body: JSON.stringify(note)
        });
        const jsonData = await data.json();
        console.log(jsonData);
    }
    
    const deleteNote = async (id) => {
        const data = await fetch(`${host}/api/notes/remove/${id}/`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVhNDM1OTA1MWI3ODI3OWQ2MThlOTQ1In0sImlhdCI6MTcwNTI2MDQzMn0.UPAHX4NHCR9TFBVVYJlrUDxu4c9Jt5yOWHU-aPLOTV4"
            },
        });
        const jsonData = await data.json();
        console.log(jsonData);
        const n = notes.filter((note)=>note._id!==id)
        setNotes(n);
    }
    
    return (
        <NoteContext.Provider value={{ notes, setNotes, fetchNotes, addNote, editNote, deleteNote }}>
            {props.children}
        </NoteContext.Provider>
    );
}

export default NoteState;