import React, { useState } from "react";
import CurrentLocation from "./currentLocation";
import "./App.css";

function App() {
  return (
    <React.Fragment>
      <div className="container">
        <CurrentLocation />
      </div>
      <div className="footer-info">
        <a href="https://www.htmlhints.com/article/how-to-create-toggle-switch/93">
        </a>{" "}
        Developed by{" "}
        <a target="_blank" href="https://in.linkedin.com/in/varsha-t-8b9984266">
        Varsha T 

        </a>
      </div>
    </React.Fragment>
  );
}

export default App;
