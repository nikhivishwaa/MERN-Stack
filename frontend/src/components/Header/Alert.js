import React, { useContext } from "react";
import NoteContext from "../../context/note/NoteContext";
import caps from "../modifiers/caps";

export default function Alert() {
  const context = useContext(NoteContext);
  const { alert } = context;
  return (
    <>
      {alert ? (
        <div
          className={`alert alert-${alert.level} alert-dismissible py-2 fade ${
            alert.level ? "show" : "hide"
          }`}
          role="alert"
          style={{ height: "40px", marginTop: "60px" }}
        >
          <strong>{caps(alert.level)} : </strong>{" "}
          {alert.message ? caps(alert.message) : null}
        </div>
      ) : (
        <div
          className="py-2"
          style={{ height: "40px", marginTop: "60px" }}
        ></div>
      )}{" "}
    </>
  );
}
