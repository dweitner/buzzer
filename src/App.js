import React, { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import "./App.css";

const LOCKED = "LOCKED";
const UNLOCKED = "UNLOCKED";
const ERROR = "ERROR";
const LOADING = "LOADING";

const ANIMATED_LOCK_URL = "https://i.imgur.com/sMGLv3d.gif";
const STATIC_LOCK_URL = "https://i.imgur.com/35tUWu4.gif";

function App() {
  const [status, setStatus] = useState(LOCKED);
  const [data, setData] = useState("_");

  function openDoor() {
    setStatus(LOADING);
    fetch("/.netlify/functions/open-door", { method: "POST" })
      .then((response) => response.json())
      .then((data) => {
        setStatus(data.isError ? ERROR : UNLOCKED);
        setData(data.msg);
      });
  }

  function getButtonText(status) {
    if (status === LOADING) {
      return "Loading...";
    } else if (status === LOCKED || status === UNLOCKED || status === ERROR) {
      return "Open";
    } else {
      return "Error";
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={status === UNLOCKED ? ANIMATED_LOCK_URL : STATIC_LOCK_URL} alt="lock"></img>
          <Button style={{'min-width':'120px'}} variant="dark" onClick={openDoor} disabled={status === LOADING}>
            {getButtonText(status)}
          </Button>
        <br />
        <span>{status === ERROR ? "Error: " + data : ""}</span>
      </header>
    </div>
  );
}

export default App;
