import React, { useState, useRef } from 'react';
import { NavLink } from 'react-router-dom'
import { host } from '../../context/note/NoteState';

export default function Login() {
  const ref = useRef(null);
  const [user, setUser] = useState({ email: "", password: "" });
  const onchange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  }
  const loginUser = async (event) => {
    event.preventDefault();
    const data = await fetch(`${host}/api/auth/login/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user)
    });
    const jsonData = await data.json();
    if (jsonData.success) {
      localStorage.setItem('_token', jsonData.authtoken);
      ref.current.click();
    }
  }


  return (
    <>
      <form onSubmit={loginUser}>
        <div class="mb-3">
          <label for="Email" class="form-label">Email address</label>
          <input type="email" name="email" class="form-control" id="Email" onChange={onchange} required />
        </div>
        <div class="mb-3">
          <label for="Password" class="form-label">Password</label>
          <input type="password" name="password" class="form-control" onChange={onchange}
            id="Password" required />
        </div>
        <button type="submit" class="btn btn-primary" disabled={user.email.length < 7 || user.password.length < 8}>Login</button>
        <NavLink ref={ref} className="d-none" to="/"></NavLink>
      </form>
    </>
  )
}
