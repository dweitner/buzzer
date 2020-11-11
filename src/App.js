import React, { useState } from "react";
import "./App.css";

function LambdaDemo() {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState("");

  function openDoor() {
    setIsLoading(true);
    fetch("/.netlify/functions/async-dadjoke")
      .then((response) => response.json())
      .then((data) => {
        setIsLoading(false);
        console.log(data);
        setData(data.msg);
      });
  }

  return (
    <p>
      <button onClick={openDoor}>
        {isLoading ? "Loading..." : "Call Async Lambda"}
      </button>
      <br />
      <span>{data}</span>
    </p>
  );
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Click to open
        </p>
        <LambdaDemo />
      </header>
    </div>
  );
}

export default App;
