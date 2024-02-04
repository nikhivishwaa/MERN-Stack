import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { host } from "../../context/note/NoteState";

export default function Profile() {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  const temp = async (x) => {
    let res = await fetch(`${host}/api/auth/user/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": x,
      },
    });
    res = await res.json();
    console.log(res);
    if (res.success) {
      setUserData(res.data);
    }
  };
  useEffect(() => {
    let x = localStorage.getItem("_token");
    if (!x) navigate("/login");
    else {
      temp(x);
    }
  }, []);

  const memberSince = () => {
    let x = new Date(userData.date);
    x = x.toDateString().split(" ");
    return `${x[2]} ${x[1]} ${x[0]}`;
  };

  return (
    <div>
      <h1>Profile</h1>
      {userData ? (
        <div>
          <h4>Name : {userData.name}</h4>
          <h4>Email : {userData.email}</h4>
          <h4>Member Since : {memberSince()}</h4>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
