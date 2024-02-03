import React from "react";

export default function Auth() {
  useEffect(() => {
    let x = localStorage.getItem("_token");
    if (!x) {
      navigate("/login");
    }
  }, []);
  return <></>;
}
