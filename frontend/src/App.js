import "./App.css";
import About from "./components/Body/About";
import Navbar from "./components/Header/Navbar";
import Home from "./components/Body/Home";
import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NoteState from "./context/note/NoteState";
import Login from "./components/User/Login";
import Signup from "./components/User/Signup";
import Profile from "./components/User/Profile";


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
            <Route exact path="/about" element={<About />}></Route>
          </Routes>
          <Routes>
            <Route exact path="/login" element={<Login />}></Route>
          </Routes>
          <Routes>
            <Route exact path="/signup" element={<Signup />}></Route>
          </Routes>
          <Routes>
            <Route exact path="/profile" element={<Profile />}></Route>
          </Routes>
        </div>
      </BrowserRouter>
    </NoteState>
    </>
  );
}

export default App;