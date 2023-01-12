import "bootstrap/dist/css/bootstrap.min.css";
import "../../../../../styles/Main.css";
import React from "react";

function Loading(plate) {
  return (
    <div>
      {plate.plate !== '' ? (
        <span className="Loading">LOADING</span>
      ) : (
        <span></span>
      )}
    </div>
  );
}

export default Loading;
