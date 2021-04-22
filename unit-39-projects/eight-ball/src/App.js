import React from 'react';
import './App.css';
import EightBall from "./components/EightBall"

function App() {
  return (
    <div className="App">
      <h2>Predictions from the all-knowing Magic 8-Ball</h2>
      <div>
      <EightBall />
      </div>
    </div>
  );
}

export default App;
