import React, { useState, useContext, useEffect } from "react";
import Notes from "./Notes";
import NoteContext from "../../context/note/NoteContext";
import AddNote from "./AddNote";
import Auth from "../User/Auth";
import { useNavigate } from "react-router-dom";

export default function TextForm() {
  const context = useContext(NoteContext);
  const { fetchNotes } = context;
  const navigate = useNavigate();
  useEffect(() => {
    let x = localStorage.getItem("_token");
    if (!x) navigate("/login");
    else fetchNotes();
  }, []);

  return (
    <>
      <Auth />
      <AddNote />
      <Notes />
    </>
  );
}
