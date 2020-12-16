import React, { useState, useEffect } from "react";
import "./App.css";
import Div100vh from "react-div-100vh";

const LOCKED = "LOCKED";
const UNLOCKED = "UNLOCKED";
const ERROR = "ERROR";
const LOADING = "LOADING";

function App() {
  const [status, setStatus] = useState(LOCKED);
  const [data, setData] = useState("_");
  const [useAutoMode, setAutoMode] = useState(true);

  useEffect(() => {
    if (status === UNLOCKED) {
      let timer = setTimeout(() => setStatus(LOCKED), 3000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [status]);

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
    <Div100vh>
      <div className="App">
        <header
          class={
            status === UNLOCKED
              ? "App-header unlocked-background"
              : "App-header"
          }
        >
          <div className="container">
            <span class={status === UNLOCKED ? "lock unlocked" : "lock"}></span>
          </div>
          <button class="btn" onClick={openDoor}>
            <strong>{status === LOADING ? "Loading" : "Open"}</strong>
          </button>
          <br />
          <span>{status === ERROR ? "Error: " + data : ""}</span>
        </header>
      </div>
    </Div100vh>
  );
}

export default App;
