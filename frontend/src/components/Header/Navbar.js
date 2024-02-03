import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';

export default function Navbar() {
  const logout = () => {
    localStorage.clear();
  }
  useEffect(()=>{
    console.log("nav")
  },[])
  return (
    <nav className={`navbar navbar-expand-lg bg-dark text-white`}>
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">
          <img className="mx-2" src={process.env.PUBLIC_URL + "/inotebook.png"} alt="inotebook" width="35" height="35" />
        </NavLink>
        <NavLink className="navbar-brand active" to="/">iNotebook</NavLink>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link" aria-current="page" to="/">Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/about">About</NavLink>
            </li>
          </ul>
          <div className="auth-panel">
            <NavLink className="btn btn-primary mx-1" to="/signup" role="button">Sign Up</NavLink>
            <NavLink className="btn btn-primary mx-1" to="/login" role="button">Login</NavLink>
          </div>
          <div className="user-panel">
            <NavLink className="btn btn-primary mx-1" to="/signup" role="button">Sign Up</NavLink>
            <button className="btn btn-primary mx-1" onClick={logout} role="button">Logout</button>
          </div>
        </div>
      </div>
    </nav>
  )
}