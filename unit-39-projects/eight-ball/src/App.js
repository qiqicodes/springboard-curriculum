import React from "react";
import "./App.css";
import EightBall from "./components/EightBall";
import ResetBtn from "./components/Reset";
function App() {
  return (
    <div className="App">
      <div className="Heading">
        Predictions from the all-knowing Magic 8-Ball
      </div>
      <EightBall />
      <div className="Click">Click the ball</div>
    </div>
  );
}

export default App;
