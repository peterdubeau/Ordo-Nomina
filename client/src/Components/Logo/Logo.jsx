import React from "react";
import "./Logo.css";

export default function Logo() {
  return (
    <div className="logo">
      <h1
        style={{
          fontSize: "35px",
          marginTop: "50px",
          alignSelf: "center",
        }}
      >
        Ordo Nomina
      </h1>
      <img
        className="on-image"
        src="https://res.cloudinary.com/dyrvlnond/image/upload/v1608509018/Tracker/Artboard_1_llwk43.png"
      />
    </div>
  );
}
