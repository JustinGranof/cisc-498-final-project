import React, { useEffect, useState } from "react";

// CSS imports
import "./modal.css";

export default function Modal(props) {
  const show = props.show;

  // component did mount
  useEffect(() => {
    // disable scrolling
    window.document.body.style.overflowY = show ? "hidden" : "auto";
  }, [show]);

  if (!show) return null;

  return (
    <React.Fragment>
      <div onClick={() => props.setShow(false)} className="dim" />
      <div className="dim modal-container">{props.children}</div>
    </React.Fragment>
  );
}
