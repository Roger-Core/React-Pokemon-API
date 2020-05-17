import React from "react";
import "./SpinnerLoader.css";

export default function SpinnerLoader() {
  return (
    <div className="lds-ring">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}
