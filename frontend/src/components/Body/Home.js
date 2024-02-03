import React, { useState, useContext, useEffect } from "react";
import Notes from "./Notes";
import NoteContext from "../../context/note/NoteContext";
import AddNote from "./AddNote";
import Auth from "../User/Auth";

export default function TextForm() {
  const context = useContext(NoteContext);
  const { fetchNotes, user } = context;
  useEffect(() => {
    if (user) fetchNotes();
  }, []);

  return (
    <>
      <Auth />
      <AddNote />
      <Notes />
    </>
  );
}
