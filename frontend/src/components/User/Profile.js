import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { host } from "../../context/note/NoteState";

export default function Profile() {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  useEffect(async () => {
    let x = localStorage.getItem("_token");
    if (!x) navigate("/login");
    else {
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
        localStorage.setItem("_token", res.authtoken);
        setUserData(res);
      }
    }
  }, []);

  return (
    <div>
      <h1>profile</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ex, culpa
        deleniti distinctio, quis optio aut sed fugit, vero ducimus eligendi
        adipisci quibusdam laborum porro vitae esse veniam voluptates
        necessitatibus placeat omnis reprehenderit. Illo sed, eaque doloremque
        voluptatibus eius assumenda, et ullam ea earum atque iure
        exercitationem, suscipit similique laudantium doloribus?
      </p>
    </div>
  );
}
