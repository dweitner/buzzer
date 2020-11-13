import React, { useState, useEffect } from "react";
import "./App.css";

const LOCKED = "LOCKED";
const UNLOCKED = "UNLOCKED";
const ERROR = "ERROR";
const LOADING = "LOADING";

function App() {
  const [status, setStatus] = useState(LOCKED);
  const [data, setData] = useState("_");
  const [useAutoMode, setAutoMode] = useState(true);

  useEffect(
    () => {
      if (status === UNLOCKED) {
        let timer = setTimeout(() => setStatus(LOCKED), 3000);
        return () => {
          clearTimeout(timer);
        };
      }
    },
    [status]
  );

  function openDoor() {
    setStatus(LOADING);
    fetch("/.netlify/functions/open-door", { method: "POST" })
      .then((response) => response.json())
      .then((data) => {
        setStatus(data.isError ? ERROR : UNLOCKED);
        setData(data.msg);
      });
  }

  let params = new URLSearchParams(window.location.search);
  let autoParam = params.get("auto");
  if (autoParam && useAutoMode) {
    openDoor();
    setAutoMode(false);
  }

  return (
    <div className="App">
      <header className="App-header">
        <div class="container">
          <span class={status === UNLOCKED ? "lock unlocked" : "lock"}></span>
        </div>
        <button class="btn" onClick={openDoor}>
          <strong>{status === LOADING ? "Loading" : "Open"}</strong>
        </button>
        <br />
        <span>{status === ERROR ? "Error: " + data : ""}</span>
      </header>
    </div>
  );
}

export default App;
