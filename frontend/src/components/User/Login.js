import React, { useState, useRef, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NoteContext from "../../context/note/NoteContext";
import { host } from "../../context/note/NoteState";

export default function Login() {
  const context = useContext(NoteContext);
  const { newAlert, setUser } = context;
  const ref = useRef(null);
  const navigate = useNavigate();
  const [user, setLoginUser] = useState({ email: "", password: "" });
  const onchange = (event) => {
    setLoginUser({ ...user, [event.target.name]: event.target.value });
  };

  useEffect(() => {
    let x = localStorage.getItem("_token");
    if (x) navigate("/");
  }, []);

  const loginUser = async (event) => {
    event.preventDefault();
    const data = await fetch(`${host}/api/auth/login/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    const jsonData = await data.json();
    if (jsonData.success) {
      localStorage.setItem("_token", jsonData.authtoken);
      newAlert("success", `welcome back to iNoteBook`);
      setUser(jsonData.authtoken);
      navigate("/");
    }
  };

  return (
    <>
      <form onSubmit={loginUser}>
        <div class="mb-3">
          <label for="Email" class="form-label">
            Email address
          </label>
          <input
            type="email"
            name="email"
            class="form-control"
            id="Email"
            onChange={onchange}
            required
          />
        </div>
        <div class="mb-3">
          <label for="Password" class="form-label">
            Password
          </label>
          <input
            type="password"
            name="password"
            class="form-control"
            onChange={onchange}
            id="Password"
            required
          />
        </div>
        <button
          type="submit"
          class="btn btn-primary"
          disabled={user.email.length < 7 || user.password.length < 8}
        >
          Login
        </button>
      </form>
    </>
  );
}
