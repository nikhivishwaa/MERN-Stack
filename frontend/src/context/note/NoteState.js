import { useState } from "react";
import NoteContext from "./NoteContext";

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

export const host = "http://localhost:4500";

const NoteState = (props) => {
  const [notes, setNotes] = useState([]);
  const [alert, setAlert] = useState(null);
  const [user, setUser] = useState(null || localStorage.getItem("_token"));

  const fetchNotes = async () => {
    const notelist = await fetch(`${host}/api/notes/all/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("_token"),
      },
    });
    const noteInitial = await notelist.json();
    if (noteInitial.success) {
      setNotes(noteInitial.note);
      newAlert("success", "your notes fetched");
    }
  };

  const addNote = async (newNote) => {
    const data = await fetch(`${host}/api/notes/new/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("_token"),
      },
      body: JSON.stringify(newNote),
    });
    const jsonData = await data.json();
    if (jsonData.success) {
      setNotes(notes.concat(jsonData.note));
      newAlert("success", "note created successfully");
    }
  };

  const editNote = async (note = {}) => {
    const data = await fetch(`${host}/api/notes/change/${note._id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("_token"),
      },
      body: JSON.stringify(note),
    });
    const jsonData = await data.json();
    if (jsonData.success) {
      const updatedNotes = notes.map((n) => {
        if (n._id === note._id) return jsonData.note;
        return n;
      });
      setNotes(updatedNotes);
      newAlert("success", "note updated successfully");
    }
  };

  const deleteNote = async (id) => {
    const data = await fetch(`${host}/api/notes/remove/${id}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("_token"),
      },
    });
    const jsonData = await data.json();
    if (jsonData.success) {
      const n = notes.filter((note) => note._id !== id);
      setNotes(n);
      newAlert("success", "note deleted successfully");
    }
  };

  const newAlert = (t = "success", msg = "good to go") => {
    setAlert({ level: t, message: msg });
    setTimeout(() => setAlert(null), 2000);
  };

  return (
    <NoteContext.Provider
      value={{
        notes,
        setNotes,
        fetchNotes,
        addNote,
        editNote,
        deleteNote,
        newAlert,
        alert,
        user,
        setUser,
      }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
