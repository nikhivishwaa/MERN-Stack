import React, { useContext, useState } from "react";
import { host } from "../../context/note/NoteState";
import NoteContext from "../../context/note/NoteContext";
import { useNavigate } from "react-router-dom";
import caps from "../modifiers/caps";

export default function Signup() {
  const context = useContext(NoteContext);
  const { newAlert } = context;
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });
  const onchange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  const navigate = useNavigate();
  const handleSignup = async (e) => {
    e.preventDefault();
    let { cpassword, ...data } = user;
    console.log(data);
    let res = await fetch(`${host}/api/auth/createuser/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    res = await res.json();
    console.log(res);
    if (res.success) {
      localStorage.setItem("_token", res.authtoken);
      newAlert(
        "success",
        `welcome ${data.name.split(" ").map(caps)} in iNoteBook`
      );
      navigate("/");
    }
  };
  return (
    <>
      <form onSubmit={handleSignup}>
        <div class="mb-3">
          <label for="Name" class="form-label">
            Full Name
          </label>
          <input
            type="text"
            name="name"
            class="form-control"
            id="Name"
            onChange={onchange}
            required
          />
        </div>
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
        <div class="mb-3">
          <label for="cPassword" class="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            name="cpassword"
            class="form-control"
            onChange={onchange}
            style={
              user.password !== user.cpassword ? { borderColor: "red" } : {}
            }
            id="cPassword"
            required
          />
        </div>
        <button
          type="submit"
          class="btn btn-primary"
          disabled={
            user.email.length < 7 ||
            user.password.length < 8 ||
            user.password !== user.cpassword
          }
        >
          Sign Up
        </button>
      </form>
    </>
  );
}
