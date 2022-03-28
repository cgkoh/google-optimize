import logo from "./logo.svg";
import "./App.css";
import React, { useState, useEffect } from 'react';

const useExperiment = (experimentId) => {
  const [variant, setVariant] = useState();
  useEffect(() => {
    (async () => {
      if (window.dataLayer) {
        await window.dataLayer.push({ event: "optimize.activate" });
      }
      const intervalId = setInterval(() => {
        if (window.google_optimize !== undefined) {
          // Set the variant to the state.
          setVariant(window.google_optimize.get(experimentId));
          clearInterval(intervalId);
        }
      }, 100);
    })();
  });
  return variant;
};

const App = () => {
  const variant = useExperiment('0_5HsReYTVaZ0WVP-9CnCA'); //Replace the Id into Optimize Experiment ID
  console.log(variant);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Variant {variant}</p>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
};

export default App;
