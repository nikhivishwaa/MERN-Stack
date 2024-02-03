import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Auth() {
  const navigate = useNavigate();
  useEffect(() => {
    let x = localStorage.getItem("_token");
    if (!x) {
      navigate("/login");
    }
  }, []);
  return <></>;
}
