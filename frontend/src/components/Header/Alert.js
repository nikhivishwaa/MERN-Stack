import React, { useContext } from "react";
import NoteContext from "../../context/note/NoteContext";
import caps from "../modifiers/caps";

export default function Alert() {
  const context = useContext(NoteContext);
  const { alert } = context;
  return (
    <>
      {alert && (
        <div
          className={`alert alert-${alert.level} alert-dismissible py-2 fade ${
            alert.level ? "show" : "hide"
          }`}
          role="alert"
        >
          <strong>{caps(alert.level)} : </strong>{" "}
          {alert.message ? caps(alert.message) : null}
        </div>
      )}
    </>
  );
}
