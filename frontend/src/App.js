import "./App.css";
import About from "./components/Body/About";
import Navbar from "./components/Header/Navbar";
import Home from "./components/Body/Home";
import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NoteState from "./context/note/NoteState";


function App() {
  return (
    <><NoteState>
      <BrowserRouter>
        <Navbar />
        <div className="container my-4">
          <Routes>
            <Route
              exact path="/"
              element={
                <Home />
              }
            ></Route>
            <Route path="/about" element={<About />}></Route>
          </Routes>
        </div>
      </BrowserRouter>
    </NoteState>
    </>
  );
}

export default App;